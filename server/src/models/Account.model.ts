import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  account_id: {
    type: String,
    required: true,
  },
  company: {
    type: Date,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;
