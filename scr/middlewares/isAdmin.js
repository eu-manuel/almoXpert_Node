/**
 * Middleware para verificar se o usuário é administrador
 * Deve ser usado APÓS o middleware auth
 *
 * O campo isAdmin vem do token JWT decodificado em req.user.isAdmin
 */
function isAdmin(req, res, next) {
  // Verifica se o middleware auth foi executado antes
  if (!req.user) {
    return res.status(401).json({
      error: 'Usuário não autenticado.',
    });
  }

  // Verifica se o usuário é admin (booleano)
  if (!req.user.isAdmin) {
    return res.status(403).json({
      error: 'Acesso negado. Apenas administradores podem realizar esta ação.',
    });
  }

  next();
}

module.exports = isAdmin;
