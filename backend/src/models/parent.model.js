// parent.model.js

import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
            unique: true,
        },
        children: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
        occupation: {
            type: String,
            trim: true,
        },
        relationship: {
            type: String,
            enum: ["father", "mother", "guardian", "other"],
            default: "father",
        },
        address: {
            street: String,
            city: String,
            state: String,
            pincode: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Parent", parentSchema);
