import cron from 'node-cron';
import { sendNutrientEmail } from './sendNutrientEmail.js';
import User from './models/user.model.js';
import FoodEntry from './models/food.model.js';

export const sendDailyNutrientReports = async () => {
    console.log("\n=== Starting Nutrient Report Job ===");
    const users = await User.find();
    console.log(`📊 Found ${users.length} users`);

    for (const user of users) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const entries = await FoodEntry.find({
            userId: user._id,
            date: { $gte: today } // Make sure this matches your schema field
        });

        console.log(`📦 ${user.fullName} → ${entries.length} entries`);

        if (!entries.length) continue;

        const totals = entries.reduce((acc, e) => {
            acc.calories += e.calories || 0;
            acc.protein += e.protein || 0;
            acc.carbs += e.carbs || 0;
            acc.fats += e.fats || 0;
            return acc;
        }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

        const emailText = `
Hello ${user.fullName},

Here’s your Nutrify report:

Calories: ${totals.calories}
Protein: ${totals.protein}g
Carbs: ${totals.carbs}g
Fat: ${totals.fats}g
        `;

        await sendNutrientEmail(user.email, 'Your Daily Nutrify Report', emailText);
        console.log(`✅ Sent email to ${user.email}`);
    }
};

export const startScheduler = () => {
    cron.schedule('0 8,13,20 * * *', sendDailyNutrientReports, { timezone: 'Asia/Kolkata' });
    console.log("⏳ Scheduler is active...");
};
