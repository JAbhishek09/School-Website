// timetable.model.js

import mongoose from "mongoose";

const periodSchema = new mongoose.Schema(
    {
        day: {
            type: String,
            enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
            required: [true, "Day is required"],
        },
        periodNumber: {
            type: Number,
            required: [true, "Period number is required"],
            min: 1,
        },
        startTime: {
            type: String, // e.g. "09:00"
            required: [true, "Start time is required"],
        },
        endTime: {
            type: String, // e.g. "09:45"
            required: [true, "End time is required"],
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: [true, "Subject is required"],
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: [true, "Teacher is required"],
        },
        room: {
            type: String,
            trim: true,
        },
    },
    { _id: true }
);

const timetableSchema = new mongoose.Schema(
    {
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: [true, "Class is required"],
        },
        academicYear: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicYear",
            required: [true, "Academic year is required"],
        },
        periods: [periodSchema],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// One active timetable per class per academic year
timetableSchema.index({ classId: 1, academicYear: 1 }, { unique: true });

export default mongoose.model("Timetable", timetableSchema);
