const Project = require("../models/Project");
const User = require("../models/User");
<<<<<<< HEAD
const Task = require("../models/Task");
=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

const createProject = async (req, res) => {
    try {
        if (req.user.role !== "Manager") {
            return res.status(401).json({ message: "Access Denied. Only Managers can create projects." });
        }

        const { name, description, projectLeader, deadline } = req.body;
        const formattedDeadline = new Date(deadline);
<<<<<<< HEAD

        // multiple file upload
        const fileUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
=======
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

        const project = new Project({
            name,
            description,
            managerId: req.user.id,
            projectLeader,
            deadline: formattedDeadline,
<<<<<<< HEAD
            files: fileUrls, // multiple file upload
=======
            file: fileUrl,
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        });

        await project.save();
        res.status(201).json({ message: "Project created successfully", project });
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};

const getProjects = async (req, res) => {
    try {
        let projects;

        if (req.user.role === "Manager") {
            projects = await Project.find({ managerId: req.user.id })
                .populate("projectLeader", "name _id")
<<<<<<< HEAD
                .select("name description projectLeader deadline files status"); 
        } else if (req.user.role === "Project Leader") {
            projects = await Project.find({ projectLeader: req.user.id })
                .populate("managerId projectLeader", "name _id")
                .select("name description projectLeader deadline files status"); 
=======
                .select("name description projectLeader deadline file status"); // ✅ Include "file"
        } else if (req.user.role === "Project Leader") {
            projects = await Project.find({ projectLeader: req.user.id })
                .populate("managerId projectLeader", "name _id")
                .select("name description projectLeader deadline file status"); // ✅ Include "file"
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        } else {
            return res.status(403).json({ message: "Access Denied" });
        }

        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

<<<<<<< HEAD
const getDetailedProjects = async (req, res) => {
    try{
        if (req.user.role === "Team Member") {
            return res.status(401).json({ message: "Access Denied. Only accessible to Managers and Project Leaders." });
        }

        const {projectId} = req.params;

        const projectData = await Project.findById(projectId)
            .populate("managerId", "name")
            .populate("projectLeader", "name");

        const taskData = await Task.find({projectId})
            .populate("assignedTo", "name");

        res.status(200).json({projectData, taskData});
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

const getProjectLeaders = async (req, res) => {
    try {
        if (req.user.role !== "Manager") {
            return res.status(401).json({ message: "Access Denied. Only accessible to Managers" });
        }

        const leaders = await User.find({ role: "Project Leader" }).select("name _id");
        res.json(leaders);
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};

<<<<<<< HEAD

=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, projectLeader, deadline } = req.body;
<<<<<<< HEAD

        // Find existing project
        const existingProject = await Project.findById(id);
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Keep existing files and add new ones
        const existingFiles = existingProject.files || [];
        const newFiles = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                name,
                description,
                projectLeader,
                deadline,
                files: [...existingFiles, ...newFiles], // Append new files
            },
            { new: true }
        );

=======
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name, description, projectLeader, deadline },
            { new: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ message: "Server Error", err });
    }
};

<<<<<<< HEAD
const updateProjectStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!["Not Started", "In Progress", "Completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
  
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      if (req.user.role !== "Project Leader") {
        return res.status(403).json({ message: "Access denied" });
      }
  
      project.status = status;
      await project.save();
  
      res.status(200).json({ message: "Project status updated", project });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  

module.exports = { createProject, getProjects, getDetailedProjects, getProjectLeaders, updateProject, updateProjectStatus };
=======

module.exports = { createProject, getProjects, getProjectLeaders, updateProject };
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
