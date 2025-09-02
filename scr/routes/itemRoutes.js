const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const auth = require("../middlewares/auth"); // protege as rotas

// CRUD de Itens
router.post("/", auth, itemController.createItem);     // Criar
router.get("/", auth, itemController.getItems);        // Listar todos
router.get("/:id", auth, itemController.getItemById);  // Buscar por ID
router.put("/:id", auth, itemController.updateItem);   // Atualizar
router.delete("/:id", auth, itemController.deleteItem);// Deletar

module.exports = router;
