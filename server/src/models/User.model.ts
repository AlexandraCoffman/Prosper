import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  life_info: {
    type: [String],
    default: [],
  },
  support: {
    type: [String],
    default: [],
  },
  goals: {
    type: [String],
    required: true,
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
