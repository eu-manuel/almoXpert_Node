const { warehouseCreateSchema, warehouseUpdateSchema } = require("../schemas/warehouseSchemas");

const validateWarehouseCreate = async (req, res, next) => {
    try {
        await warehouseCreateSchema.parseAsync(req.body);
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

const validateWarehouseUpdate = async (req, res, next) => {
    try {
        await warehouseUpdateSchema.parseAsync(req.body);
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
    validateWarehouseCreate,
    validateWarehouseUpdate
};