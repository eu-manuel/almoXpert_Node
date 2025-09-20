const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middlewares/auth");

// CRUD de Categorias
router.post("/", auth, categoryController.createCategory);
router.get("/", auth, categoryController.getCategories);
router.get("/:id", auth, categoryController.getCategoryById);
router.put("/:id", auth, categoryController.updateCategory);
router.delete("/:id", auth, categoryController.deleteCategory);

// Relacionar Item <-> Categoria
router.post("/add-item", auth, categoryController.addItemToCategory);

module.exports = router;
