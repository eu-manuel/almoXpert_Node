const express = require("express");
const router = express.Router();
const movementController = require("../controllers/movementController");
const auth = require("../middlewares/auth");

// CRUD de Movimentações
router.post("/", auth, movementController.createMovement);
router.get("/", auth, movementController.getMovements);
router.get("/:id", auth, movementController.getMovementById);
router.put("/:id", auth, movementController.updateMovement);
router.delete("/:id", auth, movementController.deleteMovement);

module.exports = router;
