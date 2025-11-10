const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middlewares/auth");
const validateCategory = require("../middlewares/validateCategory")

/**
 * @route POST /api/categories
 * @description Create a new category in the system
 * @access Private - Requires authentication
 * @body {Object} categoryData
 * @body {string} categoryData.name - Category name
 * @body {string} categoryData.description - Category description
 * @returns {Object} The newly created category
 */
router.post("/", auth, validateCategory.create, categoryController.createCategory);

/**
 * @route GET /api/category
 * @description Retrieve all categories in the system
 * @access Private - Requires authentication
 * @returns {Array} List of all categories with their information
 */
router.get("/", auth, categoryController.getCategories);

/**
 * @route GET /api/category/:id
 * @description Retrieve a specific category by its ID
 * @access Private - Requires authentication
 * @param {string} id - The ID of the category to retrieve
 * @returns {Object} The requested category's information
 */
router.get("/:id", auth, categoryController.getCategoryById);

/**
 * @route PUT /api/category/:id
 * @description Update an existing category's information
 * @access Private - Requires authentication
 * @param {string} id - The ID of the category to update
 * @body {Object} updateData - The fields to update (name, description)
 * @returns {Object} The updated category information
 */
router.put("/:id", auth, validateCategory.update, categoryController.updateCategory);

/**
 * @route DELETE /api/category/:id
 * @description Remove a category from the system
 * @access Private - Requires authentication
 * @param {string} id - The ID of the category to delete
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/:id", auth, categoryController.deleteCategory);

/**
 * @route POST /api/category/add-item
 * @description Associate an item with a category
 * @access Private - Requires authentication
 * @body {Object} relationData
 * @body {string} relationData.itemId - ID of the item to associate
 * @body {string} relationData.categoryId - ID of the category
 * @returns {Object} The created item-category relationship
 */
router.post("/add-item", auth, categoryController.addItemToCategory);

module.exports = router;
