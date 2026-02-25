// subject.model.js

import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subject name is required"],
            trim: true,
        },
        code: {
            type: String,
            required: [true, "Subject code is required"],
            unique: true,
            uppercase: true,
            trim: true, // e.g. "MATH101"
        },
        type: {
            type: String,
            enum: ["theory", "practical", "both"],
            default: "theory",
        },
        description: {
            type: String,
            trim: true,
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: [true, "Class is required"],
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
    },
    { timestamps: true }
);

subjectSchema.index({ classId: 1, name: 1 });

export default mongoose.model("Subject", subjectSchema);
