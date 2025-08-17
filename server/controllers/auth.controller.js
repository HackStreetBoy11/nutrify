import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ messaage: "All fields are required" })
        }

        // ✅ Check if email is a valid Gmail
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid Gmail address" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }
        else {
            res.status(400).json({ messaage: "invalid user data" })
        }
    }
    catch (error) {
        console.log("error while signUp", error.messaage)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        {
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid Credentials" })
            }
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    }
    catch (error) {
        console.log("Error in login controller", error.messaage);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged Out Successfully" });
    }
    catch (err) {
        console.log("Error in logout controller", err.messaage);
        res.status(500).json({
            messaage: "Internal Server Error"
        });
    }
};



export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user.id;
        console.log("it is comming")
        console.log("Cloudinary object:", cloudinary);

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        // ✅ Upload image to Cloudinary
        const uploadRes = await cloudinary.uploader.upload(profilePic, {
            folder: "profiles",
        });

        // ✅ Update user in DB
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadRes.secure_url },
            { new: true }
        );

        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        console.log("Error in checkAuth Controller", error.message);
        res.status(500).json({ messaage: "Internal Server Error2" });
    }
}

