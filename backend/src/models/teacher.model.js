// teacher.model.js

import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
            unique: true,
        },
        employeeId: {
            type: String,
            required: [true, "Employee ID is required"],
            unique: true,
            trim: true,
        },
        qualifications: [
            {
                degree: String,
                institution: String,
                year: Number,
            },
        ],
        specialization: {
            type: String,
            trim: true,
        },
        experience: {
            type: Number, // in years
            default: 0,
        },
        dateOfJoining: {
            type: Date,
            default: Date.now,
        },
        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject",
            },
        ],
        assignedClasses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Class",
            },
        ],
        isClassTeacher: {
            type: Boolean,
            default: false,
        },
        classTeacherOf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
