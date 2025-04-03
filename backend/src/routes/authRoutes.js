const express = require("express");
const { 
    register, 
    login, 
    getProfile, 
    editProfile, 
    logout, 
    getAllUsers 
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// **User Registration Route**
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already registered. Please login." });
        }

        // Register user via controller function without profile photo
        await register(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

// **Login Route**
router.post("/login", login);

// **Logout Route**
router.post("/logout", logout);

// **Get Profile (Authenticated User)**
router.get("/profile", authMiddleware, getProfile);

// **Edit Profile (No profile picture update)**
router.put("/profile/edit", authMiddleware, async (req, res) => {
    try {
        // Edit profile without handling profile photo
        await editProfile(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
});

// **Get All Users**
router.get("/allUsers", authMiddleware, getAllUsers);

// **Fetch Logged-in User Details**
router.get("/me", authMiddleware, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// **Fetch All Users (Required for Chat)**
router.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("name _id role"); // Removed profilePhoto from selection
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

module.exports = router;
