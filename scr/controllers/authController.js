const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // verifica se usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    // compara senha
    const validPass = await bcrypt.compare(senha, user.senha);
    if (!validPass) return res.status(400).json({ error: "Senha inválida" });

    // gera o token
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email, cargo: user.cargo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
