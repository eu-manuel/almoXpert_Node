const { supplierCreateSchema, supplierUpdateSchema } = require("../schemas/supplierSchemas");

const validateSupplier = {
  create(req, res, next) {
    try {
      supplierCreateSchema.parse(req.body);
      next();
    } catch (err) {
      const messages = err.errors ? err.errors.map((e) => e.message) : [err.message];
      return res.status(400).json({ error: messages });
    }
  },

  update(req, res, next) {
    try {
      supplierUpdateSchema.parse(req.body);
      next();
    } catch (err) {
      const messages = err.errors ? err.errors.map((e) => e.message) : [err.message];
      return res.status(400).json({ error: messages });
    }
  },
};

module.exports = validateSupplier;