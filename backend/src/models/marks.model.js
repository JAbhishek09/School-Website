// marks.model.js

import mongoose from "mongoose";

const marksSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: [true, "Student is required"],
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: [true, "Subject is required"],
        },
        examId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: [true, "Exam is required"],
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: [true, "Class is required"],
        },
        marksObtained: {
            type: Number,
            required: [true, "Marks obtained is required"],
            min: 0,
        },
        totalMarks: {
            type: Number,
            required: [true, "Total marks is required"],
            min: 1,
        },
        grade: {
            type: String,
            trim: true, // e.g. "A+", "B", "C"
        },
        remarks: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// One marks entry per student per subject per exam
marksSchema.index({ studentId: 1, subjectId: 1, examId: 1 }, { unique: true });

export default mongoose.model("Marks", marksSchema);
