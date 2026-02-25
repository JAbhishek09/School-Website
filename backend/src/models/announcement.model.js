// announcement.model.js

import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Announcement title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"],
        },
        targetRoles: [
            {
                type: String,
                enum: ["admin", "teacher", "student", "parent", "all"],
            },
        ],
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium",
        },
        attachments: [
            {
                fileName: String,
                fileUrl: String,
                fileType: String,
            },
        ],
        isPublished: {
            type: Boolean,
            default: false,
        },
        publishDate: {
            type: Date,
        },
        expiryDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

announcementSchema.index({ isPublished: 1, publishDate: -1 });
announcementSchema.index({ targetRoles: 1 });

export default mongoose.model("Announcement", announcementSchema);
