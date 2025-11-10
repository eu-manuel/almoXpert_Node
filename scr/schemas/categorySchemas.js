const { z } = require("zod");

const categoryCreateSchema = z.object({
    nome: z
      .string({
        required_error: "O nome é obrigatório.",
        invalid_type_error: "O nome deve ser uma string.",
        })
        .min(1, "O nome não pode estar vazio."),
    descricao: z
        .string({
        invalid_type_error: "A descrição deve ser uma string.",
        })
        .optional(),
});

const categoryUpdateSchema = z.object({
    nome: z
      .string({
        invalid_type_error: "O nome deve ser uma string.",
      })
      .min(1, "O nome não pode estar vazio.")
      .optional(),
    descricao: z
      .string({
        invalid_type_error: "A descrição deve ser uma string.",
      })
      .optional(),
  })
  .refine(
    (data) => data.nome || data.descricao,
    {
      message: "Envie pelo menos um campo para atualização (nome ou descrição).",
    }
  );

module.exports = { categoryCreateSchema, categoryUpdateSchema };
