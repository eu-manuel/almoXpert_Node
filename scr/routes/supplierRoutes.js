const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const auth = require("../middlewares/auth");
const validateSupplier = require("../middlewares/validateSupplier");

/**
 * @route POST /api/supplier
 * @description Create a new supplier in the system
 * @access Private - Requires authentication
 * @body {Object} supplierData
 * @body {string} supplierData.nome - Supplier name
 * @body {string} supplierData.CNPJ - Supplier CNPJ
 * @body {string} supplierData.telefone - Supplier phone number
 * @body {string} supplierData.email - Supplier email address
 * @body {string} supplierData.endereco - Supplier physical address
 * @returns {Object} The newly created supplier
 */
router.post("/", auth, validateSupplier.create, supplierController.createSupplier);

/**
 * @route GET /api/supplier
 * @description Retrieve all suppliers in the system
 * @access Private - Requires authentication
 * @returns {Array} List of all suppliers with their information
 */
router.get("/", auth, supplierController.getSuppliers);

/**
 * @route GET /api/supplier/:id
 * @description Retrieve a specific supplier by their ID
 * @access Private - Requires authentication
 * @param {string} id - The ID of the supplier to retrieve
 * @returns {Object} The requested supplier's information
 */
router.get("/:id", auth, supplierController.getSupplierById);

/**
 * @route PUT /api/supplier/:id
 * @description Update an existing supplier's information
 * @access Private - Requires authentication
 * @param {string} id - The ID of the supplier to update
 * @body {Object} updateData - The fields to update (name, email, phone, address)
 * @returns {Object} The updated supplier information
 */
router.put("/:id", auth, validateSupplier.update, supplierController.updateSupplier);

/**
 * @route DELETE /api/supplier/:id
 * @description Remove a supplier from the system
 * @access Private - Requires authentication
 * @param {string} id - The ID of the supplier to delete
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/:id", auth, supplierController.deleteSupplier);

module.exports = router;
