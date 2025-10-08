const express = require("express");
const router = express.Router();
const movementController = require("../controllers/movementController");
const auth = require("../middlewares/auth");

/**
 * @route POST /api/moviment
 * @description Create a new inventory movement (entry, exit, transfer, or adjustment)
 * @access Private - Requires authentication
 * @body {Object} movementData - The data for the new movement
 * @body {string} movementData.tipo - Movement type ("entrada", "saida", "transferencia", "ajuste")
 * @body {number} movementData.id_item - ID of the item being moved
 * @body {number} movementData.id_almoxarifado - ID of the warehouse
 * @body {number} movementData.quantidade - Quantity being moved
 * @body {string} [movementData.observacao] - Observation or description of the movement (optional)
 * @body {number} movementData.id_usuario - ID of the user performing the movement
 * @body {Date} [movementData.data_movimentacao] - Date of the movement (optional, defaults to current date)
 * @returns {Object} The newly created movement record
 */
router.post("/", auth, movementController.createMovement);

/**
 * @route GET /api/moviment
 * @description Retrieve all inventory movements in the system
 * @access Private - Requires authentication
 * @returns {Array} List of all movements with their information
 */
router.get("/", auth, movementController.getMovements);

/**
 * @route GET /api/moviment/:id
 * @description Retrieve a specific movement by its ID
 * @access Private - Requires authentication
 * @param {string} id - The ID of the movement to retrieve
 * @returns {Object} The requested movement's information
 */
router.get("/:id", auth, movementController.getMovementById);

/**
 * @route PUT /api/moviment/:id
 * @description Update an existing movement's information
 * @access Private - Requires authentication
 * @param {string} id - The ID of the movement to update
 * @body {Object} updateData - The fields to update
 * @returns {Object} The updated movement information
 */
router.put("/:id", auth, movementController.updateMovement);

/**
 * @route DELETE /api/moviment/:id
 * @description Remove a movement record from the system
 * @access Private - Requires authentication
 * @param {string} id - The ID of the movement to delete
 * @returns {Object} Success message or deletion confirmation
 */
router.delete("/:id", auth, movementController.deleteMovement);

module.exports = router;
