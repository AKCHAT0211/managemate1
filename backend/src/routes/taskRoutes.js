const express = require("express");
const {createTask, getTasks, getAllTasks, getTeamMembers,getProjectName} = require("../controllers/taskController");
<<<<<<< HEAD
const {updateTask, submitTask} = require("../controllers/teamMemberController");
=======
const {updateTask} = require("../controllers/teamMemberController");
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/createTask", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/allTasks", authMiddleware, getAllTasks);
router.put("/updateTask/:id", authMiddleware, updateTask);
<<<<<<< HEAD
router.put("/submit/:id", authMiddleware, submitTask);
=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
router.get("/members", authMiddleware, getTeamMembers);
router.get("/projectName", authMiddleware, getProjectName);

module.exports = router;