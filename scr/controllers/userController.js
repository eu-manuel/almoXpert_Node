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
      const { nome, email, role } = req.body;

      const missingFields = [];
      if (!nome) missingFields.push("nome");
      if (!email) missingFields.push("email");
      if (!role) missingFields.push("role");

      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: `Os seguintes campos são obrigatórios: ${missingFields.join(", ")}` 
        });
      }

      const [updated] = await User.update(
        { nome, email, role },
        { where: { id_usuario: id } }
      );

      if (!updated) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json({ message: "Usuário atualizado com sucesso" });
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
