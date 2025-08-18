import express from 'express';
const router = express.Router();

import { protectRoute } from '../middleware/auth.middleware.js';
import { getUserForSidebar, sendMessage, getMessages } from '../controllers/message.controller.js';

// Get all users for sidebar
router.get("/users", protectRoute, getUserForSidebar);

// Get messages with a specific user
// Added /chat prefix to avoid conflicts and validation for id
router.get("/chat/:id", protectRoute, getMessages);

// Send message to a specific user
router.post("/send/:id", protectRoute, sendMessage);
export default router;
