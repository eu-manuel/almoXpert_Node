// middlewares/validateUser.js
const { userSchema, userUpdateSchema } = require("../schemas/userSchemas");

const validateUser = {
  create(req, res, next) {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map(err => err.message);
    return res.status(400).json({ errors });
  }
  next();
},

 update(req, res, next) {
  const result = userUpdateSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map(err => err.message);
    return res.status(400).json({ errors });
  }
  next();
}

};

module.exports = validateUser;
