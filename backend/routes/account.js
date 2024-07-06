const express = require("express");
const authMiddleware = require("../middlewares");
const { UserModel, AccountsModel } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const username = req.username;

  try {
    const user = await UserModel.findOne({ username: username });
    const account = await AccountsModel.findOne({ userId: user._id });
    res.status(200).json({
      balance: account.balance,
    });
  } catch {
    res.status(404).json({
      msg: "there is an error",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const body = req.body;
  const sender = req.username;

  const session = await mongoose.startSession();

  session.startTransaction();

  const user = await UserModel.findOne({ username: sender }).session(session);
  const userAccount = await AccountsModel.findOne({ userId: user._id }).session(
    session
  );

  if (userAccount.balance < body.amount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "Insufficient Balance",
    });
  }

  const reciever = await AccountsModel.findOne({ userId: body.to }).session(
    session
  );

  if (!reciever) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "Invalid account",
    });
  }

  await AccountsModel.updateOne(
    { userId: body.to },
    { $inc: { balance: body.amount } }
  ).session(session);

  await AccountsModel.updateOne(
    { userId: user._id },
    { $inc: { balance: -body.amount } }
  ).session(session);

  await session.commitTransaction();
  session.endSession();

  res.status(200).json({
    msg: "transaction successful",
  });
});

module.exports = router;
