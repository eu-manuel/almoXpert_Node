const User = require("../models/User");

const UserController = {
  async listUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id_usuario: id } });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateUser(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, cargo } = req.body;

    // Verifica se pelo menos um campo foi enviado
    if (!nome && !email && !cargo) {
      return res.status(400).json({
        error: "É necessário enviar pelo menos um campo para atualização (nome, email ou role).",
      });
    }

    // Busca o usuário atual
    const user = await User.findOne({ where: { id_usuario: id } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualiza apenas os campos enviados
    const updatedUser = {
      nome: nome ?? user.nome,   // se nome vier undefined, mantém o anterior
      email: email ?? user.email,
      cargo: cargo ?? user.cargo,
    };

    await user.update(updatedUser);

    res.json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},


  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await User.destroy({ where: { id_usuario: id } });

      if (!deleted) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json({ message: "Usuário removido" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = UserController;
