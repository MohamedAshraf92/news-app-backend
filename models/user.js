import { Schema, model } from "mongoose";

import { preSaveUser } from "../helpers/userHelpers.js";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscribedSources: [String],
});

userSchema.pre("save", preSaveUser);

export default model("User", userSchema);
