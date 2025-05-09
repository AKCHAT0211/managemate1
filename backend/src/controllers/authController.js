const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
<<<<<<< HEAD

const register = async (req, res) => {
    const {name, email, password, role} = req.body;
    const profilePicture = req.file ? `/uploads/profile-pictures/${req.file.filename}` : "";

    if(!name || !email || !password || !role){
        return res.status(400).json({message: "All fields are required"});
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({name, email, password: hashedPassword, role, profilePicture});
        await user.save();  

        res.status(201).json({message: "User registered successfully"});
    }
    catch(err){
        return res.status(500).json({ message: "Server Error", err });
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ message: "User does not exists" });

        const validPassword = await bcrypt.compare(password, user.password);
        
        if(!validPassword){
            return res.status(400).json({message: "Incorrect password"});
        }

        const token = jwt.sign({id:user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict"
        });

        res.json({message: "Login successful", token, user});
    }
    catch(err){
        res.status(500).json({ message: "Server Error", err });
    }
}

const getProfile = async (req, res) => {
    try{
=======
require("dotenv").config();

// 📌 REGISTER USER
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ message: "An unexpected error occurred" });
    }
};

// 📌 LOGIN USER
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ message: "Login successful", token, user });
    } catch (err) {
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};

// 📌 LOGOUT USER
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};

// 📌 GET USER PROFILE
const getProfile = async (req, res) => {
    try {
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
<<<<<<< HEAD
            profilePicture: user.profilePicture || null,
            created_at: new Date(user.createdAt).toLocaleString()
        });
    }
    catch(err){
        res.status(500).json({ message: "Server Error", err });
    }
}

=======
            created_at: new Date(user.createdAt).toLocaleString(),
        });
    } catch (err) {
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};

// 📌 EDIT USER PROFILE
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
const editProfile = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

<<<<<<< HEAD
        if (name) {
            user.name = name;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        if (req.file) {
            user.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
        }

        await user.save();

        res.json({ message: "Profile updated successfully", user: { name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture || null } });
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logged out successfully"});
}

const getAllUsers = async (req, res) => {
    try{
=======
        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (err) {
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};

// 📌 GET ALL USERS (Restricted to Managers)
const getAllUsers = async (req, res) => {
    try {
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        if (req.user.role !== "Manager") {
            return res.status(401).json({ message: "Access Denied. Only accessible to Managers" });
        }

        const users = await User.find({ _id: { $ne: req.user._id } });
        res.status(201).json(users);
<<<<<<< HEAD
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
}

module.exports = {register, login, getProfile, editProfile, logout, getAllUsers};
=======
    } catch (err) {
        res.status(500).json({ message: "An unexpected error occurred" });
    }
};

module.exports = { register, login, getProfile, editProfile, logout, getAllUsers };
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
