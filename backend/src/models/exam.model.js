// exam.model.js

import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Exam name is required"],
            trim: true, // e.g. "Mid-Term Exam 2025"
        },
        examType: {
            type: String,
            enum: ["unit-test", "mid-term", "final", "quarterly", "half-yearly"],
            required: [true, "Exam type is required"],
        },
        academicYear: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicYear",
            required: [true, "Academic year is required"],
        },
        classes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Class",
            },
        ],
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
            required: [true, "End date is required"],
        },
        description: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

examSchema.index({ academicYear: 1, examType: 1 });

export default mongoose.model("Exam", examSchema);
