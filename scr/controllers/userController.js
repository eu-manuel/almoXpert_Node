const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, cargo } = req.body;
    const hashed = await bcrypt.hash(senha, 10);
    const user = await User.create({ nome, email, senha: hashed, cargo });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado!" });

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(400).json({ error: "Senha inválida!" });

    const token = jwt.sign(
      { id: user.id_usuario, cargo: user.cargo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erro no login" });
  }
};
