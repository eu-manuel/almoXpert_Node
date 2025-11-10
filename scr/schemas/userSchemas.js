// schemas/userSchema.js
const { z } = require("zod");

// Schema para criação (mantemos o seu original)
const userSchema = z.object({
  nome: z.string({
      required_error: "O nome é obrigatório.",
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(2, "O nome deve ter pelo menos 2 caracteres."),

  email: z.string({
      required_error: "O email é obrigatório.",
      invalid_type_error: "O email deve ser uma string.",
    })
    .email("Formato de email inválido."),

  senha: z.string({
      required_error: "A senha é obrigatória.",
      invalid_type_error: "A senha deve ser uma string.",
    })
    .min(6, "A senha deve ter pelo menos 6 caracteres."),

  cargo: z.string({
      required_error: "O cargo é obrigatório.",
      invalid_type_error: "O cargo deve ser uma string.",
    })
    .min(2, "O cargo deve ter pelo menos 2 caracteres."),
});

// Schema para atualização (todos os campos opcionais, mas validados se fornecidos)
const userUpdateSchema = z.object({
  nome: z.string({
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .optional(),

  email: z.string({
      invalid_type_error: "O email deve ser uma string.",
    })
    .email("Formato de email inválido.")
    .optional(),

  senha: z.string({
      invalid_type_error: "A senha deve ser uma string.",
    })
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .optional(),

  cargo: z.string({
      invalid_type_error: "O cargo deve ser uma string.",
    })
    .min(2, "O cargo deve ter pelo menos 2 caracteres.")
    .optional(),
});

module.exports = { userSchema, userUpdateSchema };
