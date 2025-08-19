import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.route.js';
// import messageRoutes from './routes/message.route.js';
// import foodRoutes from './routes/food.route.js';
import connectDb from './lib/db.js';
import { app, server } from './lib/socket.js';
// import { sendDailyNutrientReports, startScheduler } from './scheduler.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ✅ Start scheduler safely
// try {
//     sendDailyNutrientReports();
//     startScheduler();
// } catch (err) {
//     console.error("Error starting scheduler:", err.message);
// }

// ✅ CORS
app.use(cors({
    origin: ["http://localhost:5173"], // your frontend origin
    credentials: true
}));

// ✅ JSON + cookie parser
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/food", foodRoutes);

// ✅ Serve React frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, './frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './frontend/dist', 'index.html'));
    });
}

// ✅ Start server
server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await connectDb();
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
});
