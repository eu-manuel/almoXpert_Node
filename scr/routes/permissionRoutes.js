const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");
const auth = require("../middlewares/auth");

/**
 * @route POST /api/permissions
 * @description Create a new permission in the system
 * @access Private - Requires authentication
 * @body {Object} permissionData
 * @body {string} permissionData.name - Permission name
 * @body {string} permissionData.description - Permission description
 * @returns {Object} The newly created permission
 */
router.post("/", auth, permissionController.createPermission);

/**
 * @route GET /api/permissions
 * @description Retrieve all permissions in the system
 * @access Private - Requires authentication
 * @returns {Array} List of all permissions with their information
 */
router.get("/", auth, permissionController.getPermissions);

/**
 * @route GET /api/permissions/:id
 * @description Retrieve a specific permission by its ID
 * @access Private - Requires authentication
 * @param {string} id - The ID of the permission to retrieve
 * @returns {Object} The requested permission's information
 */
router.get("/:id", auth, permissionController.getPermissionById);

/**
 * @route PUT /api/permissions/:id
 * @description Update an existing permission's information
 * @access Private - Requires authentication
 * @param {string} id - The ID of the permission to update
 * @body {Object} updateData - The fields to update (name, description, resource, action)
 * @returns {Object} The updated permission information
 */
router.put("/:id", auth, permissionController.updatePermission);

/**
 * @route DELETE /api/permissions/:id
 * @description Remove a permission from the system
 * @access Private - Requires authentication
 * @param {string} id - The ID of the permission to delete
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/:id", auth, permissionController.deletePermission);

module.exports = router;
