const mongoose = require("mongoose");
const { string } = require("zod");

mongoose
  .connect("mongodb+srv://suprithn:suprithn@cluster0.9fqgfp5.mongodb.net/")
  .then(() => console.log("connected to database successfully"));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    trim: true,
    lowercase: true,
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const AccountsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model("UserModel", userSchema);
const AccountsModel = mongoose.model("AccountsModel", AccountsSchema);

module.exports = { UserModel, AccountsModel };
