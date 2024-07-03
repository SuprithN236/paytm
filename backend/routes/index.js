const express = require("express");
const { user } = require("../db");
const userRouter = require("./user");
const accountRouter = require("./account");
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
