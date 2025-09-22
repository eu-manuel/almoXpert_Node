const express = require("express");
const router = express.Router();
const userPermissionController = require("../controllers/userPermissionController");

// Conceder permissão a um usuário
router.post("/", userPermissionController.addPermissionToUser);

// Listar permissões de um usuário
router.get("/user/:id_usuario", userPermissionController.getUserPermissions);

// Listar usuários que têm uma permissão
router.get("/permission/:id_permissao", userPermissionController.getPermissionUsers);

// Revogar permissão de um usuário
router.delete("/", userPermissionController.removePermissionFromUser);

module.exports = router;
