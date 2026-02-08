const router = require("express").Router();

const {
  createProject,
  getProjects,
  assignDevelopers,
  getAssignedProjects,
  getProjectById,
  getDashboardStats,
  markProjectCompleted,
  getProjectStats
} = require("../controllers/projectcontroller.js");

const { verifyToken, allowRoles } = require("../middleware/authmiddleware.js");


router.post("/", verifyToken, allowRoles("admin"), createProject);

router.get("/", verifyToken, getProjects);

router.get("/assigned", verifyToken, allowRoles("developer"), getAssignedProjects);

router.get("/stats", verifyToken, getProjectStats);

router.get("/stats/dashboard", verifyToken, getDashboardStats);

router.put("/:id/assign", verifyToken, allowRoles("admin","lead"), assignDevelopers);

router.put("/:id/complete", verifyToken, allowRoles("admin","lead"), markProjectCompleted);

router.get("/:id", verifyToken, getProjectById);

module.exports = router;
