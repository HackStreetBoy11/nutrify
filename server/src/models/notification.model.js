import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["protein", "calories", "water", "custom"], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
