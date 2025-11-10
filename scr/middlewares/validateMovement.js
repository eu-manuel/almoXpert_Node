const { movementCreateSchema, movementUpdateSchema } = require("../schemas/movementSchemas");

const validateMovementCreate = async (req, res, next) => {
    try {
        await movementCreateSchema.parseAsync(req.body);
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

const validateMovementUpdate = async (req, res, next) => {
    try {
        await movementUpdateSchema.parseAsync(req.body);
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
    validateMovementCreate,
    validateMovementUpdate
};