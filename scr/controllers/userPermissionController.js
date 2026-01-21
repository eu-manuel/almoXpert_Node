const UserPermission = require('../models/UserPermission');
const User = require('../models/User');
const Permission = require('../models/Permission');

// Conceder permissão a um usuário
exports.addPermissionToUser = async (req, res) => {
  try {
    const { id_usuario, id_permissao } = req.body;

    const userPermission = await UserPermission.create({
      id_usuario,
      id_permissao,
    });

    res.status(201).json(userPermission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar permissões de um usuário
exports.getUserPermissions = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const user = await User.findByPk(id_usuario, {
      include: Permission,
    });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json(user.Permissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar usuários de uma permissão
exports.getPermissionUsers = async (req, res) => {
  try {
    const { id_permissao } = req.params;

    const permission = await Permission.findByPk(id_permissao, {
      include: User,
    });

    if (!permission)
      return res.status(404).json({ error: 'Permissão não encontrada' });

    res.json(permission.Users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Revogar permissão de um usuário
exports.removePermissionFromUser = async (req, res) => {
  try {
    const { id_usuario, id_permissao } = req.body;

    const userPermission = await UserPermission.findOne({
      where: { id_usuario, id_permissao },
    });

    if (!userPermission) {
      return res
        .status(404)
        .json({ error: 'Relação usuário-permissão não encontrada' });
    }

    await userPermission.destroy();

    res.json({ message: 'Permissão removida do usuário com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
