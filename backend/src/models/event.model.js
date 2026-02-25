// event.model.js

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Event title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
        },
        location: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            enum: ["academic", "sports", "cultural", "holiday", "other"],
            default: "other",
        },
        images: [
            {
                imageUrl: String,
                caption: String,
            },
        ],
        isPublished: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Creator is required"],
        },
    },
    { timestamps: true }
);

eventSchema.index({ startDate: -1 });
eventSchema.index({ category: 1, isPublished: 1 });

export default mongoose.model("Event", eventSchema);
