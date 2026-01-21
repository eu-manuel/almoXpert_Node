const {
  categoryCreateSchema,
  categoryUpdateSchema,
} = require('../schemas/categorySchemas');

const validateCategory = {
  create(req, res, next) {
    try {
      categoryCreateSchema.parse(req.body);
      next();
    } catch (err) {
      const messages = err.errors
        ? err.errors.map((e) => e.message)
        : [err.message];
      return res.status(400).json({ error: messages });
    }
  },

  update(req, res, next) {
    try {
      categoryUpdateSchema.parse(req.body);
      next();
    } catch (err) {
      const messages = err.errors
        ? err.errors.map((e) => e.message)
        : [err.message];
      return res.status(400).json({ error: messages });
    }
  },
};

module.exports = validateCategory;
