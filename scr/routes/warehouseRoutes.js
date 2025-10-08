const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");
const auth = require("../middlewares/auth");

/**
 * @route POST /api/warehouse
 * @description Create a new warehouse in the system
 * @access Private - Requires authentication
 * @body {Object} warehouseData - The data for the new warehouse
 * @body {string} warehouseData.nome - Warehouse name
 * @body {string} [warehouseData.descricao] - Warehouse description (optional)
 * @body {string} [warehouseData.localizacao] - Warehouse physical location (optional)
 * @body {number} [warehouseData.capacidade_maxima] - Maximum capacity (optional)
 * @body {number} warehouseData.responsavel_id - ID of the user responsible for the warehouse
 * @body {string} [warehouseData.status] - Warehouse status ("ativo" or "inativo", default "ativo")
 * @returns {Object} The newly created warehouse
 */
router.post("/", auth, warehouseController.createWarehouse);


/**
 * @route GET /api/warehouse
 * @description Retrieve all warehouses in the system
 * @access Private - Requires authentication
 * @returns {Array} List of all warehouses with their information
 */
router.get("/", auth, warehouseController.getWarehouses);

/**
 * @route GET /api/warehouse/:id
 * @description Retrieve a specific warehouse by its ID
 * @access Private - Requires authentication
 * @param {string} id - The ID of the warehouse to retrieve
 * @returns {Object} The requested warehouse's information
 */
router.get("/:id", auth, warehouseController.getWarehouseById);

/**
 * @route PUT /api/warehouse/:id
 * @description Update an existing warehouse's information
 * @access Private - Requires authentication
 * @param {string} id - The ID of the warehouse to update
 * @body {Object} updateData - The fields to update (name, location, description)
 * @returns {Object} The updated warehouse information
 */
router.put("/:id", auth, warehouseController.updateWarehouse);

/**
 * @route DELETE /api/warehouse/:id
 * @description Remove a warehouse from the system
 * @access Private - Requires authentication
 * @param {string} id - The ID of the warehouse to delete
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/:id", auth, warehouseController.deleteWarehouse);

module.exports = router;
