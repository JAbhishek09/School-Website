// user.model.js

import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  passwordResetToken: String,
  passwordResetExpires: Date
}, { timestamps: true });


// 🔹 Method to generate reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token before saving to DB
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token valid for 15 minutes
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000;

  return resetToken; // Send raw token via email
};

export default mongoose.model("User", userSchema);