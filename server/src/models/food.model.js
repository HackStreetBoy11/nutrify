// models/TrackedFood.js
import mongoose from "mongoose";

const trackedFoodSchema = new mongoose.Schema({
    userId: { // 🔹 Reference to the user who owns this entry
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    calories: { type: Number },
    protein: { type: Number },
    carbs: { type: Number },
    fats: { type: Number },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Food = mongoose.model("TrackedFood", trackedFoodSchema);
export default Food;
