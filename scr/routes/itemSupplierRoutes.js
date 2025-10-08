const express = require("express");
const router = express.Router();
const itemSupplierController = require("../controllers/itemSupplierController");
const auth = require("../middlewares/auth");

/**
 * @route POST /api/item-suppliers
 * @description Create a new association between an item and a supplier
 * @access Private - Requires authentication
 * @body {Object} relationData - The data for the new item-supplier relationship
 * @body {number} relationData.id_item - ID of the item
 * @body {number} relationData.id_supplier - ID of the supplier
 * @body {number} [relationData.preco] - Item price from this supplier (optional)
 * @body {string} [relationData.prazo_entrega] - Delivery time for the item (optional, e.g., "7 dias")
 * @returns {Object} The created item-supplier relationship
 */
router.post("/", auth, itemSupplierController.createItemSupplier);


/**
 * @route GET /api/item-supplier
 * @description Retrieve all item-supplier associations
 * @access Private - Requires authentication
 * @returns {Array} List of all item-supplier relationships
 */
router.get("/", auth, itemSupplierController.getItemSuppliers);

/**
 * @route GET /api/item-supplier/:id
 * @description Retrieve a specific item-supplier association by its ID
 * @access Private - Requires authentication
 * @param {string} id - The ID of the item-supplier relationship to retrieve
 * @returns {Object} The requested item-supplier relationship details
 */
router.get("/:id", auth, itemSupplierController.getItemSupplierById);

/**
 * @route PUT /api/item-supplier/:id
 * @description Update an item-supplier association
 * @access Private - Requires authentication
 * @param {string} id - The ID of the item-supplier relationship to update
 * @body {Object} updateData
 * @body {number} updateData.price - Updated price for the item from this supplier
 * @body {string} updateData.supplierCode - Updated supplier's code for this item
 * @returns {Object} The updated item-supplier relationship
 */
router.put("/:id", auth, itemSupplierController.updateItemSupplier);

/**
 * @route DELETE /api/item-supplier/:id
 * @description Remove an item-supplier association
 * @access Private - Requires authentication
 * @param {string} id - The ID of the item-supplier relationship to delete
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/:id", auth, itemSupplierController.deleteItemSupplier);

module.exports = router;
