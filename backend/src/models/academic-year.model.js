// academic-year.model.js

import mongoose from "mongoose";

const academicYearSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Academic year name is required"],
            unique: true,
            trim: true, // e.g. "2025-26"
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
            required: [true, "End date is required"],
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("AcademicYear", academicYearSchema);
