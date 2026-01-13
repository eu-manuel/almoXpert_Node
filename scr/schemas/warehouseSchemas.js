const { z } = require("zod");

const warehouseCreateSchema = z.object({
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
    localizacao: z
        .string({
            invalid_type_error: "A localização deve ser uma string.",
        })
        .optional(),
    capacidade_maxima: z
        .number({
            invalid_type_error: "A capacidade máxima deve ser um número.",
        })
        .int("A capacidade máxima deve ser um número inteiro.")
        .positive("A capacidade máxima deve ser um número positivo.")
        .optional()
        .nullable(),
    responsavel_id: z
        .number({
            invalid_type_error: "O ID do responsável deve ser um número.",
        })
        .int("O ID do responsável deve ser um número inteiro.")
        .positive("O ID do responsável deve ser um número positivo.")
        .optional(), // Vem do token JWT, não do body,
    status: z
        .enum(["ativo", "inativo"], {
            invalid_type_error: "O status deve ser 'ativo' ou 'inativo'.",
        })
        .optional(),
});

const warehouseUpdateSchema = z.object({
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
    localizacao: z
        .string({
            invalid_type_error: "A localização deve ser uma string.",
        })
        .optional(),
    capacidade_maxima: z
        .number({
            invalid_type_error: "A capacidade máxima deve ser um número.",
        })
        .int("A capacidade máxima deve ser um número inteiro.")
        .positive("A capacidade máxima deve ser um número positivo.")
        .optional(),
    responsavel_id: z
        .number({
            invalid_type_error: "O ID do responsável deve ser um número.",
        })
        .int("O ID do responsável deve ser um número inteiro.")
        .positive("O ID do responsável deve ser um número positivo.")
        .optional(),
    status: z
        .enum(["ativo", "inativo"], {
            invalid_type_error: "O status deve ser 'ativo' ou 'inativo'.",
        })
        .optional(),
})
.refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Envie pelo menos um campo para atualização.",
    }
);

module.exports = { warehouseCreateSchema, warehouseUpdateSchema };