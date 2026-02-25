// submission.model.js

import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        assignmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
            required: [true, "Assignment is required"],
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: [true, "Student is required"],
        },
        files: [
            {
                fileName: String,
                fileUrl: String,
                fileType: String,
            },
        ],
        submittedAt: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["pending", "submitted", "graded", "late"],
            default: "pending",
        },
        grade: {
            type: String,
            trim: true,
        },
        feedback: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// One submission per student per assignment
submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });

export default mongoose.model("Submission", submissionSchema);
