// assignment.model.js

import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Assignment title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: [true, "Teacher is required"],
        },
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: [true, "Class is required"],
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: [true, "Subject is required"],
        },
        dueDate: {
            type: Date,
            required: [true, "Due date is required"],
        },
        attachments: [
            {
                fileName: String,
                fileUrl: String,
                fileType: String,
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

assignmentSchema.index({ classId: 1, subjectId: 1 });
assignmentSchema.index({ teacherId: 1 });

export default mongoose.model("Assignment", assignmentSchema);
