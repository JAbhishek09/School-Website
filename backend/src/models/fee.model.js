// fee.model.js

import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: [true, "Student is required"],
        },
        academicYear: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicYear",
            required: [true, "Academic year is required"],
        },
        feeType: {
            type: String,
            enum: ["tuition", "transport", "library", "laboratory", "sports", "exam", "admission", "other"],
            required: [true, "Fee type is required"],
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: 0,
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"],
        },
        paidDate: {
            type: Date,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "overdue", "partial"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "bank-transfer", "upi", "cheque", "online", "other"],
        },
        transactionId: {
            type: String,
            trim: true,
        },
        receiptNumber: {
            type: String,
            trim: true,
        },
        remarks: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

feeSchema.index({ studentId: 1, academicYear: 1, feeType: 1 });
feeSchema.index({ paymentStatus: 1 });

export default mongoose.model("Fee", feeSchema);
