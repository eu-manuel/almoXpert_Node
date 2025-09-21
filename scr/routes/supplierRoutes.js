const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const auth = require("../middlewares/auth");

// CRUD de Fornecedores
router.post("/", auth, supplierController.createSupplier);
router.get("/", auth, supplierController.getSuppliers);
router.get("/:id", auth, supplierController.getSupplierById);
router.put("/:id", auth, supplierController.updateSupplier);
router.delete("/:id", auth, supplierController.deleteSupplier);

module.exports = router;
