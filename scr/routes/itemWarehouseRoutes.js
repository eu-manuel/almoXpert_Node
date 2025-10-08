const express = require("express");
const router = express.Router();
const itemWarehouseController = require("../controllers/itemWarehouseController");
const auth = require("../middlewares/auth");

/**
 * @route POST /api/item-warehouses
 * @description Create a new association between an item and a warehouse (item entry)
 * @access Private - Requires authentication
 * @body {Object} entryData - The data for the new item-warehouse relationship
 * @body {number} entryData.id_item - ID of the item
 * @body {number} entryData.id_almoxarifado - ID of the warehouse
 * @body {number} [entryData.quantidade] - Initial quantity of the item in the warehouse (optional, default 0)
 * @body {Date} [entryData.data_entrada] - Entry date (optional, defaults to current date)
 * @body {Date} [entryData.data_saida] - Exit date (optional)
 * @returns {Object} The created item-warehouse relationship
 */
router.post("/", auth, itemWarehouseController.createItemWarehouse);


/**
 * @route GET /api/item-warehouses
 * @description Retrieve all item-warehouse associations
 * @access Private - Requires authentication
 * @returns {Array} List of all item-warehouse relationships with quantities
 */
router.get("/", auth, itemWarehouseController.getItemWarehouses);

/**
 * @route GET /api/item-warehouses/:id
 * @description Retrieve a specific item-warehouse association by its ID
 * @access Private - Requires authentication
 * @param {string} id - The ID of the item-warehouse relationship to retrieve
 * @returns {Object} The requested item-warehouse relationship details
 */
router.get("/:id", auth, itemWarehouseController.getItemWarehouseById);

/**
 * @route PUT /api/item-warehouses/:id
 * @description Update an item-warehouse association (for stock adjustments or exits)
 * @access Private - Requires authentication
 * @param {string} id - The ID of the item-warehouse relationship to update
 * @body {Object} updateData
 * @body {number} updateData.quantity - New quantity of the item in the warehouse
 * @returns {Object} The updated item-warehouse relationship
 */
router.put("/:id", auth, itemWarehouseController.updateItemWarehouse);

/**
 * @route DELETE /api/item-warehouses/:id
 * @description Remove an item-warehouse association
 * @access Private - Requires authentication
 * @param {string} id - The ID of the item-warehouse relationship to delete
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/:id", auth, itemWarehouseController.deleteItemWarehouse);

module.exports = router;
