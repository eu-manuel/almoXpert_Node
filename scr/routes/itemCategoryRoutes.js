const express = require("express");
const router = express.Router();
const itemCategoryController = require("../controllers/itemCategoryController");
const auth = require("../middlewares/auth");

/**
 * @route GET /api/item-categories
 * @description Retrieve all item-category relationships
 * @access Private - Requires authentication
 * @returns {Array} List of all relationships between items and categories
 */
router.get("/", auth, itemCategoryController.getAllRelations);

/**
 * @route POST /api/item-categories
 * @description Create a new relationship between an item and a category
 * @access Private - Requires authentication
 * @body {Object} relationData - Contains itemId and categoryId
 * @returns {Object} The newly created item-category relationship
 */
router.post("/", auth, itemCategoryController.addRelation);

/**
 * @route DELETE /api/item-categories
 * @description Remove an existing relationship between an item and a category
 * @access Private - Requires authentication
 * @body {Object} relationData - Contains itemId and categoryId to be removed
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/", auth, itemCategoryController.removeRelation);

module.exports = router;
