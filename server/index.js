import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";

import path from 'path';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import connectDb from './lib/db.js';
import { app, server } from "./lib/socket.js"

import foodRoutes from './routes/food.route.js';
import { sendDailyNutrientReports, startScheduler } from './scheduler.js';

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

sendDailyNutrientReports();

startScheduler();


// ✅ CORS first
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

// ✅ JSON parsing + cookie parsing
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/food", foodRoutes);

if (process.env.NODE_ENV === "production") {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, './frontend/dist')));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, './frontend/', 'dist', 'index.html'));
    })

}

// ✅ Start server
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectDb();
});
