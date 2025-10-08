const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido." });

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "almoxarifado-api",
      audience: "almoxarifado-client",
    });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
}

module.exports = auth;
