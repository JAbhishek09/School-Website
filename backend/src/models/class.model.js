// class.model.js

import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Class name is required"],
            trim: true, // e.g. "10th", "12th", "Nursery"
        },
        section: {
            type: String,
            trim: true,
            default: "A", // e.g. "A", "B", "C"
        },
        capacity: {
            type: Number,
            default: 40,
        },
        classTeacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
        academicYear: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicYear",
            required: [true, "Academic year is required"],
        },
    },
    { timestamps: true }
);

// Compound index: one section per class per academic year
classSchema.index({ name: 1, section: 1, academicYear: 1 }, { unique: true });

export default mongoose.model("Class", classSchema);
