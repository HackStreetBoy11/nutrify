import Food from "../models/food.model.js";

// ✅ Add food for the logged-in user
export const trackFood = async (req, res) => {
    const { name, quantity, calories, protein, carbs, fats } = req.body;
    try {
        if (!name || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const trackedFood = new Food({
            userId: req.user._id, // 🔹 link to logged-in user
            name,
            quantity,
            calories,
            protein,
            carbs,
            fats,
            date: new Date()
        });

        await trackedFood.save();

        res.status(201).json({ message: "Food tracked successfully", trackedFood });
    } catch (error) {
        console.error("Error tracking food:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Fetch food for the logged-in user (by date)
export const trackedFood = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: "Date query parameter is required" });
        }

        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const foods = await Food.find({
            userId: req.user._id, // 🔹 filter by user
            date: { $gte: targetDate, $lt: nextDay }
        });

        res.json(foods);
    } catch (err) {
        console.error("Error fetching food track:", err);
        res.status(500).json({
            error: "Server error while fetching food track",
            details: err.message
        });
    }
};
