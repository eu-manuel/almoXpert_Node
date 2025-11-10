const { userPermissionCreateSchema } = require("../schemas/userPermissionSchemas");

const validateUserPermissionCreate = async (req, res, next) => {
    try {
        await userPermissionCreateSchema.parseAsync(req.body);
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
    validateUserPermissionCreate
};