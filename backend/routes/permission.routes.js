const express = require("express");
const {
  getAllPermissions,
  assignPermission,
  removePermission,
} = require("../controllers/user.controllers");
const router = express.Router();

router.get("/permissions", getAllPermissions);
router.patch("/:userId/permissions", assignPermission);
router.patch("/:userId/permissions/remove", removePermission);

module.exports = router;
