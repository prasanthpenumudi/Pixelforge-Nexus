const Project = require("../models/project.js");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate("lead developers");
  res.json(projects);
};

exports.assignDevelopers = async (req, res) => {
  try {
    const { developers } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { developers },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Assignment failed" });
  }
};

exports.getAssignedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      developers: req.user.id
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("developers", "name email");

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching project" });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const total = await Project.countDocuments();
    const active = await Project.countDocuments({ status: "active" });
    const completed = await Project.countDocuments({ status: "completed" });

    res.json({ total, active, completed });
  } catch (err) {
    res.status(500).json({ msg: "Stats error" });
  }
};

exports.markProjectCompleted = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Error updating status" });
  }
};

exports.getProjectStats = async (req, res) => {
  try {
    const total = await Project.countDocuments();
    const active = await Project.countDocuments({ status: "active" });
    const completed = await Project.countDocuments({ status: "completed" });

    res.json({ total, active, completed });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
