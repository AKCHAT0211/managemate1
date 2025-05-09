const mongoose = require("mongoose");

<<<<<<< HEAD
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["Admin", "Manager", "Project Leader", "Team Member"], required: true},
    assignedProject: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}],
    profilePicture: { type: String, default: "" }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
=======
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Manager", "Project Leader", "Team Member"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
