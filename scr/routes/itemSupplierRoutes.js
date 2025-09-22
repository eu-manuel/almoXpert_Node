const express = require("express");
const router = express.Router();
const itemSupplierController = require("../controllers/itemSupplierController");

// CRUD de ItemSupplier (associação Item ↔ Supplier)
router.post("/", itemSupplierController.createItemSupplier);
router.get("/", itemSupplierController.getItemSuppliers);
router.get("/:id", itemSupplierController.getItemSupplierById);
router.put("/:id", itemSupplierController.updateItemSupplier);
router.delete("/:id", itemSupplierController.deleteItemSupplier);

module.exports = router;
