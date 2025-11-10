const { itemCategoryCreateSchema } = require("../schemas/itemCategorySchemas");

const validateItemCategoryCreate = async (req, res, next) => {
    try {
        await itemCategoryCreateSchema.parseAsync(req.body);
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
    validateItemCategoryCreate
};