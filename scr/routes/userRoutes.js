const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rotas de usuário
router.get("/", userController.listUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
