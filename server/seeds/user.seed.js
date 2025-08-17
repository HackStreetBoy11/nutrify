import { config } from "dotenv";
import User from "../models/user.model.js";
import connectDB from "../lib/db.js";

config();

const seedUsers = [
    // Female Users
    {
        email: "priya.sharma@example.com",
        fullName: "Priya Sharma",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        email: "ananya.verma@example.com",
        fullName: "Ananya Verma",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        email: "isha.reddy@example.com",
        fullName: "Isha Reddy",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        email: "sakshi.patel@example.com",
        fullName: "Sakshi Patel",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        email: "neha.kapoor@example.com",
        fullName: "Neha Kapoor",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        email: "riya.singh@example.com",
        fullName: "Riya Singh",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        email: "aarti.jain@example.com",
        fullName: "Aarti Jain",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
        email: "meera.nair@example.com",
        fullName: "Meera Nair",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },

    // Male Users
    {
        email: "arjun.kumar@example.com",
        fullName: "Arjun Kumar",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        email: "rahul.mehta@example.com",
        fullName: "Rahul Mehta",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        email: "vikram.desai@example.com",
        fullName: "Vikram Desai",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        email: "rohan.chopra@example.com",
        fullName: "Rohan Chopra",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        email: "siddharth.iyer@example.com",
        fullName: "Siddharth Iyer",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        email: "amit.bhattacharya@example.com",
        fullName: "Amit Bhattacharya",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
        email: "karan.menon@example.com",
        fullName: "Karan Menon",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
];

// seeding dat to the database
// Function to seed the database

const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Call the function
seedDatabase();