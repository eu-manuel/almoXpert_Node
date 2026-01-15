/**
 * Middleware para verificar se o usuário é administrador
 * Deve ser usado APÓS o middleware auth
 * 
 * O cargo do usuário vem do token JWT decodificado em req.user.cargo
 */
function isAdmin(req, res, next) {
  // Verifica se o middleware auth foi executado antes
  if (!req.user) {
    return res.status(401).json({ 
      error: "Usuário não autenticado." 
    });
  }

  // Verifica se o cargo do usuário é "admin"
  if (req.user.cargo !== "admin") {
    return res.status(403).json({ 
      error: "Acesso negado. Apenas administradores podem realizar esta ação." 
    });
  }

  next();
}

module.exports = isAdmin;
