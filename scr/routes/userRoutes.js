const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const validateUser= require("../middlewares/validateUser")

/**
 * @route GET /api/users
 * @description Retrieve all users in the system
 * @access Private - Requires authentication
 * @returns {Array<Object>} List of all users with their information (excluding sensitive data like senha)
 * @property {number} id_usuario - User ID
 * @property {string} nome - User name
 * @property {string} email - User email
 * @property {string} cargo - User role or position
 */
router.get("/", auth, userController.listUsers);


/**
 * @route GET /api/users/:id
 * @description Retrieve a specific user by their ID
 * @access Private - Requires authentication
 * @param {string} id - The ID of the user to retrieve
 * @returns {Object} The requested user's information (excluding sensitive data)
 */
router.get("/:id", auth, userController.getUserById);

/**
 * @route PUT /api/users/:id
 * @description Update an existing user's information
 * @access Private - Requires authentication
 * @param {string} id - The ID of the user to update
 * @body {Object} updateData - The fields to update (name, email, role, etc.)
 * @returns {Object} The updated user information (excluding sensitive data)
 */
router.put("/:id", auth, validateUser.update, userController.updateUser);

/**
 * @route DELETE /api/users/:id
 * @description Remove a user from the system
 * @access Private - Requires authentication
 * @param {string} id - The ID of the user to delete
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
