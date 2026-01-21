const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha)
        return res.status(400).json({ error: "Email e senha são obrigatórios" });

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      const senhaValida = await bcrypt.compare(senha, user.senha);
      if (!senhaValida)
        return res.status(401).json({ error: "Senha incorreta" });

      const token = jwt.sign(
        { id: user.id_usuario, nome: user.nome, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
          issuer: "almoxarifado-api",
          audience: "almoxarifado-client",
          subject: String(user.id_usuario),
          algorithm: "HS256",
        }
      );

      const { senha: _, ...userData } = user.toJSON();
      res.json({ token, user: userData });
    } catch (err) {
      res.status(500).json({ error: "Erro ao autenticar", details: err.message });
    }
  },

  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha)
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });

      const userExist = await User.findOne({ where: { email } });
      if (userExist)
        return res.status(400).json({ error: "Email já cadastrado" });

      const hashed = await bcrypt.hash(senha, 10);
      const user = await User.create({ nome, email, senha: hashed, isAdmin: false });

      res.status(201).json({
        message: "Usuário registrado com sucesso",
        user: { id: user.id_usuario, nome: user.nome, email: user.email, isAdmin: user.isAdmin },
      });
    } catch (err) {
      res.status(500).json({ error: "Erro ao registrar usuário", details: err.message });
    }
  },
};

module.exports = AuthController;
