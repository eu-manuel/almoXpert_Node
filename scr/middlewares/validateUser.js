// middlewares/validateUser.js
const { userSchema, userUpdateSchema } = require("../schemas/userSchemas");

function validateCreateUser(req, res, next) {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map(err => err.message);
    return res.status(400).json({ errors });
  }
  next();
}

function validateUpdateUser(req, res, next) {
  const result = userUpdateSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map(err => err.message);
    return res.status(400).json({ errors });
  }
  next();
}

module.exports = { validateCreateUser, validateUpdateUser };
