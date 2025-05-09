const express = require("express");
<<<<<<< HEAD
const {register, login, getProfile, editProfile, logout, getAllUsers} = require("../controllers/authController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const router = express.Router();
const User = require("../models/User")

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile/edit", authMiddleware, upload.single("profilePicture"), editProfile);
router.get("/allUsers", authMiddleware, getAllUsers);

// Fetch logged-in user details
=======
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
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
router.get("/me", authMiddleware, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

<<<<<<< HEAD
// Fetch all users (Required for chat)
router.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("name _id role profilePicture");
=======
// **Fetch All Users (Required for Chat)**
router.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("name _id role"); // Removed profilePhoto from selection
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
