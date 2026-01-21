const express = require('express');
const router = express.Router();
const userPermissionController = require('../controllers/userPermissionController');
const auth = require('../middlewares/auth');
const {
  validateUserPermissionCreate,
} = require('../middlewares/validateUserPermission');

/**
 * @route POST /api/user-permissions
 * @description Grant a permission to a user
 * @access Private - Requires authentication
 * @body {Object} grantData - The data to create the user-permission relationship
 * @body {number} grantData.id_usuario - ID of the user receiving the permission
 * @body {number} grantData.id_permissao - ID of the permission to grant
 * @returns {Object} The created user-permission relationship
 */
router.post(
  '/',
  auth,
  validateUserPermissionCreate,
  userPermissionController.addPermissionToUser
);

/**
 * @route GET /api/user-permissions/user/:id_usuario
 * @description List all permissions granted to a specific user
 * @access Private - Requires authentication
 * @param {string} id_usuario - The ID of the user whose permissions to retrieve
 * @returns {Array} List of permissions granted to the user
 */
router.get(
  '/user/:id_usuario',
  auth,
  userPermissionController.getUserPermissions
);

/**
 * @route GET /api/user-permissions/permission/:id_permissao
 * @description List all users who have been granted a specific permission
 * @access Private - Requires authentication
 * @param {string} id_permissao - The ID of the permission to check
 * @returns {Array} List of users who have the specified permission
 */
router.get(
  '/permission/:id_permissao',
  auth,
  userPermissionController.getPermissionUsers
);

/**
 * @route DELETE /api/user-permissions
 * @description Revoke a permission from a user
 * @access Private - Requires authentication
 * @body {Object} revokeData
 * @body {string} revokeData.userId - ID of the user to revoke permission from
 * @body {string} revokeData.permissionId - ID of the permission to revoke
 * @returns {Object} Success message or deletion confirmation
 */
router.delete('/', auth, userPermissionController.removePermissionFromUser);

module.exports = router;
