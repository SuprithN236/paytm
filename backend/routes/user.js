const express = require("express");
var jwt = require("jsonwebtoken");
const { z } = require("zod");
const { UserModel, AccountsModel } = require("../db");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middlewares");

const router = express.Router();

const userSchemaZod = z.object({
  username: z
    .string()
    .email()
    .min(5, { message: "Must be 5 or more characters long" }),
  firstname: z
    .string()
    .max(50, { message: "Must be 50 or fewer characters long" }),
  lastname: z
    .string()
    .max(50, { message: "Must be 50 or fewer characters long" }),
  password: z.coerce.string(),
});

const userSchemaOptional = z.object({
  password: z.coerce.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

router.post("/signup", async (req, res) => {
  const data = req.body;
  const { success } = userSchemaZod.safeParse(data);

  if (!success) {
    res.status(404).json({
      msg: "invalid inputs",
    });
  }

  const userFound = await UserModel.findOne({ username: data.username });
  if (userFound) {
    res.status(404).json({
      msg: "user already exists",
    });
  }

  let token = jwt.sign(
    { username: data.username, password: data.password },
    JWT_SECRET
  );
  const dbUser = await UserModel.create(data);

  const account = await AccountsModel.create({
    userId: dbUser._id,
    balance: 1 + Math.floor(Math.random() * 1000),
  });

  res.status(200).json({
    msg: "user created successfully",
    token: token,
    id: dbUser._id,
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;

  const userExists = await UserModel.findOne({ username: body.username });
  console.log(userExists);

  if (!userExists) {
    res.status(404).json({
      msg: "username doesnt exist. please sign up",
    });
  }

  if (userExists.password !== body.password) {
    res.status(404).json({
      msg: "password is incorrect",
    });
  }

  const token = jwt.sign(body, JWT_SECRET);

  res.status(200).json({
    token: token,
    id: userExists.id,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const username = req.username;

  const { success } = userSchemaOptional.safeParse(body);

  if (!success) {
    res.status(411).json({
      msg: "Error while updating information",
    });
  }

  const updated = await UserModel.updateOne(
    { username: username },
    {
      ...body,
    }
  );
  res.status(200).json({
    msg: "updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const chars = req.query.filter || "";
  const regexPattern = new RegExp(chars, "i");
  const users = await UserModel.find({
    $or: [
      { firstname: { $regex: regexPattern } },
      { lastname: { $regex: regexPattern } },
    ],
  });

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      res.status(400).json({
        msg: "no user found",
      });
    }

    res.status(200).json({
      msg: user,
    });
  });

  console.log(users);

  res.status(200).json({
    data: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      id: user._id,
    })),
  });
});

module.exports = router;
