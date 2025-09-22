const express = require("express");
const router = express.Router();
const itemWarehouseController = require("../controllers/itemWarehouseController");


router.post("/", itemWarehouseController.createItemWarehouse);// Criar vínculo (entrada de item em almoxarifado)
router.get("/", itemWarehouseController.getItemWarehouses); // Listar todos
router.get("/:id", itemWarehouseController.getItemWarehouseById); // Buscar por ID
router.put("/:id", itemWarehouseController.updateItemWarehouse);// Atualizar (pode ser usado para saída ou ajuste de estoque)
router.delete("/:id", itemWarehouseController.deleteItemWarehouse); // Deletar vínculo

module.exports = router;
