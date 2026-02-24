// auth.controller.js

import crypto from "crypto";
import User from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js"; 

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If an account with that email exists, a reset link has been sent."
      });
    }

    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      You requested a password reset.
      Click the link below to reset your password:

      ${resetURL}

      This link expires in 15 minutes.
      If you did not request this, please ignore this email.
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message
    });

    res.status(200).json({
      success: true,
      message: "If an account with that email exists, a reset link has been sent."
    });

  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required"
      });
    }

    // Hash incoming token to compare with DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid or expired"
      });
    }

    user.password = password; // make sure you hash in pre-save middleware
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    next(error);
  }
};