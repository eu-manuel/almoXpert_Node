const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const auth = require("../middlewares/auth");
const validateItem = require("../middlewares/validateItem");

/**
 * @route POST /api/items
 * @description Create a new item in the inventory
 * @access Private - Requires authentication
 * @body {Object} itemData - The data for the new item
 * @body {string} itemData.nome - Item name
 * @body {string} [itemData.descricao] - Item description (optional)
 * @body {string} itemData.codigo_interno - Internal code of the item (must be unique)
 * @body {string} itemData.unidade_medida - Unit of measure (e.g., "kg", "un", "cx")
 * @body {number} [itemData.estoque_minimo] - Minimum stock (optional, default 0)
 * @body {number} [itemData.estoque_maximo] - Maximum stock (optional)
 * @body {Date} [itemData.data_cadastro] - Registration date (optional, defaults to current date)
 * @body {string} [itemData.status] - Item status ("ativo" or "inativo", default "ativo")
 * @returns {Object} The newly created item
 */
router.post("/", auth, validateItem.create, itemController.createItem);
/**
 * @route GET /api/items
 * @description Retrieve all items from the inventory
 * @access Private - Requires authentication
 * @returns {Array} List of all items with their complete information
 */
router.get("/", auth, itemController.getItems);

/**
 * @route GET /api/items/:id
 * @description Retrieve a specific item by its ID
 * @access Private - Requires authentication
 * @param {string} id - The ID of the item to retrieve
 * @returns {Object} The requested item's complete information
 */
router.get("/:id", auth, itemController.getItemById);

/**
 * @route PUT /api/items/:id
 * @description Update an existing item's information
 * @access Private - Requires authentication
 * @param {string} id - The ID of the item to update
 * @body {Object} updateData - The fields to update (name, description, quantity, etc.)
 * @returns {Object} The updated item information
 */
router.put("/:id", auth, validateItem.update, itemController.updateItem);

/**
 * @route DELETE /api/items/:id
 * @description Remove an item from the inventory
 * @access Private - Requires authentication
 * @param {string} id - The ID of the item to delete
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/:id", auth, itemController.deleteItem);

module.exports = router;
