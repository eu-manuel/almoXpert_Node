const { permissionCreateSchema, permissionUpdateSchema } = require("../schemas/permissionSchemas");

const validatePermissionCreate = async (req, res, next) => {
    try {
        await permissionCreateSchema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ 
                message: "Erro de validação", 
                errors: error.errors 
            });
        }
        next(error);
    }
};

const validatePermissionUpdate = async (req, res, next) => {
    try {
        await permissionUpdateSchema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ 
                message: "Erro de validação", 
                errors: error.errors 
            });
        }
        next(error);
    }
};

module.exports = {
    validatePermissionCreate,
    validatePermissionUpdate
};