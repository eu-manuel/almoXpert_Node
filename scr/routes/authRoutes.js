const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateUser = require("../middlewares/validateUser")

/**
 * @route POST /api/auth/login
 * @description Authenticate a user and generate an access token
 * @access Public
 * @body {Object} credentials
 * @body {string} credentials.email - User's email address
 * @body {string} credentials.password - User's password
 * @returns {Object} Authentication token and user information
 */
router.post("/login",  authController.login);

/**
 * @route POST /api/auth/register
 * @description Register a new user in the system
 * @access Public
 * @body {Object} userData
 * @body {string} userData.name - User's full name
 * @body {string} userData.email - User's email address
 * @body {string} userData.password - User's password
 * @returns {Object} Created user information (excluding sensitive data)
 */
router.post("/register", validateUser.create, authController.register);

module.exports = router;
