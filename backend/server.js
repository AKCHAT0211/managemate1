require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
<<<<<<< HEAD
const meetingRoutes = require("./src/routes/meetingRoutes");  
const dashboardRoutes = require('./src/routes/dashboard');
const adminRoutes = require("./src/routes/adminRoutes");
const Message = require("./src/models/Message");

=======
const meetingRoutes = require("./src/routes/meetingRoutes");
const dashboardRoutes = require('./src/routes/dashboard');
const Message = require("./src/models/Message");

// ✅ Initialize Express App
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

<<<<<<< HEAD

=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

<<<<<<< HEAD
=======
// ✅ Define Routes
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/messages", messageRoutes);
<<<<<<< HEAD
app.use("/meetings", meetingRoutes);  
app.use('/dashboard', dashboardRoutes);
app.use("/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

=======
app.use("/meetings", meetingRoutes);
app.use('/dashboard', dashboardRoutes);
app.use("/uploads", express.static("uploads"));

// ✅ Profile Picture Upload Logic (Removed Profile Picture Feature)

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure "uploads" directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for general file uploads (not specifically profile pictures)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// **General File Upload API (No Profile Picture Handling)**
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // Handle the uploaded file here (e.g., save the file info to the database if necessary)
        res.json({ message: "File uploaded successfully", path: `/uploads/${req.file.filename}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ WebSockets for Real-Time Communication
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
const activeUsers = new Map();

io.on("connection", (socket) => {
    console.log(`✅ User connected (Socket ID: ${socket.id})`);

    socket.on("userConnected", (userId) => {
        activeUsers.set(userId, socket.id);
    });

<<<<<<< HEAD
    // ✅ Handle Meeting Notifications
    socket.on("meetingScheduled", (meetingData) => {
        console.log("📅 New Meeting Scheduled:", meetingData.meeting.title);
        io.emit("meetingNotification", meetingData); // ✅ Notify all users
=======
    socket.on("meetingScheduled", (meetingData) => {
        console.log("📅 New Meeting Scheduled:", meetingData.meeting.title);
        io.emit("meetingNotification", meetingData);
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
    });

    socket.on("sendMessage", async ({ sender, receiver, message }) => {
        try {
            const newMessage = new Message({ sender, receiver, message, isRead: false });
            await newMessage.save();

            const savedMessage = await Message.findById(newMessage._id).populate("sender receiver", "name _id");

            const receiverSocket = activeUsers.get(receiver);
            if (receiverSocket) {
                io.to(receiverSocket).emit("receiveMessage", savedMessage);
            }

            const senderSocket = activeUsers.get(sender);
            if (senderSocket) {
                io.to(senderSocket).emit("receiveMessage", savedMessage);
            }
        } catch (error) {
<<<<<<< HEAD
            console.error("❌ Message saving error:", error);
=======
            console.error("Message saving error:", error);
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        }
    });

    socket.on("disconnect", () => {
        activeUsers.forEach((socketId, userId) => {
            if (socketId === socket.id) activeUsers.delete(userId);
        });
    });
});

// ✅ Pass WebSocket instance to app
app.set("io", io);

<<<<<<< HEAD
=======
// ✅ Use the correct port (5001)
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
const PORT = process.env.PORT || 5001;
connectDB();
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
