const { itemWarehouseCreateSchema, itemWarehouseUpdateSchema } = require("../schemas/itemWarehouseSchemas");

const validateItemWarehouseCreate = async (req, res, next) => {
    try {
        await itemWarehouseCreateSchema.parseAsync(req.body);
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

const validateItemWarehouseUpdate = async (req, res, next) => {
    try {
        await itemWarehouseUpdateSchema.parseAsync(req.body);
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
    validateItemWarehouseCreate,
    validateItemWarehouseUpdate
};