const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");
const auth = require("../middlewares/auth");

// CRUD de Permissões
router.post("/", auth, permissionController.createPermission);
router.get("/", auth, permissionController.getPermissions);
router.get("/:id", auth, permissionController.getPermissionById);
router.put("/:id", auth, permissionController.updatePermission);
router.delete("/:id", auth, permissionController.deletePermission);

module.exports = router;
