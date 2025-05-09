const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String},
    managerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    projectLeader: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    deadline: { type: Date, required: true }, 
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}],
    status: {type: String, enum: ["Not Started", "In Progress", "Completed"], default: "Not Started"},
<<<<<<< HEAD
    files: [{ type: String }], // multiple file upload
=======
    file: { type: String },
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
});

module.exports = mongoose.model("Project", projectSchema);