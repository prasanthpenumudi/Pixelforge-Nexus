const router = require("express").Router();
const {
  uploadDocument,
  getProjectDocuments
} = require("../controllers/documentController.js");

const {verifyToken,allowRoles} = require("../middleware/authmiddleware.js");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/upload",
  verifyToken,
  allowRoles("admin","lead"),
  upload.single("file"),
  uploadDocument
);

router.get(
   "/:projectId",
   verifyToken,
   getProjectDocuments
);

module.exports = router;
