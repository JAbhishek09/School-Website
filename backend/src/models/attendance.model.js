// attendance.model.js

import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: [true, "Student is required"],
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: [true, "Class is required"],
        },
        date: {
            type: Date,
            required: [true, "Date is required"],
        },
        status: {
            type: String,
            enum: ["present", "absent", "late", "excused"],
            required: [true, "Attendance status is required"],
        },
        remarks: {
            type: String,
            trim: true,
        },
        markedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: [true, "Teacher reference is required"],
        },
    },
    { timestamps: true }
);

// One attendance record per student per class per day
attendanceSchema.index({ studentId: 1, classId: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
