const { itemCreateSchema, itemUpdateSchema } = require("../schemas/itemSchemas");

const validateItem = {
  create(req, res, next) {
    try {
      itemCreateSchema.parse(req.body);
      next();
    } catch (err) {
      const messages = err.errors ? err.errors.map((e) => e.message) : [err.message];
      return res.status(400).json({ error: messages });
    }
  },

  update(req, res, next) {
    try {
      itemUpdateSchema.parse(req.body);
      next();
    } catch (err) {
      const messages = err.errors ? err.errors.map((e) => e.message) : [err.message];
      return res.status(400).json({ error: messages });
    }
  },
};

module.exports = validateItem;