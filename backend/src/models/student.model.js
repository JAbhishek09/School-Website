// student.model.js

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
            unique: true,
        },
        rollNumber: {
            type: String,
            trim: true,
        },
        admissionNumber: {
            type: String,
            required: [true, "Admission number is required"],
            unique: true,
            trim: true,
        },
        admissionDate: {
            type: Date,
            default: Date.now,
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: [true, "Class is required"],
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Parent",
        },
        dateOfBirth: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
        },
        bloodGroup: {
            type: String,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },
        address: {
            street: String,
            city: String,
            state: String,
            pincode: String,
        },
        profileImage: {
            type: String, // URL
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

studentSchema.index({ classId: 1 });
studentSchema.index({ parentId: 1 });

export default mongoose.model("Student", studentSchema);
