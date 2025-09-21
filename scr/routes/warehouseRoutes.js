const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");
const auth = require("../middlewares/auth");

// CRUD de Almoxarifados
router.post("/", auth, warehouseController.createWarehouse);
router.get("/", auth, warehouseController.getWarehouses);
router.get("/:id", auth, warehouseController.getWarehouseById);
router.put("/:id", auth, warehouseController.updateWarehouse);
router.delete("/:id", auth, warehouseController.deleteWarehouse);

module.exports = router;
