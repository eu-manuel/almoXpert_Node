const { z } = require("zod");

const itemSupplierCreateSchema = z.object({
    itemId: z
        .number({
            required_error: "O ID do item é obrigatório.",
            invalid_type_error: "O ID do item deve ser um número.",
        })
        .int("O ID do item deve ser um número inteiro.")
        .positive("O ID do item deve ser um número positivo."),
    supplierId: z
        .number({
            required_error: "O ID do fornecedor é obrigatório.",
            invalid_type_error: "O ID do fornecedor deve ser um número.",
        })
        .int("O ID do fornecedor deve ser um número inteiro.")
        .positive("O ID do fornecedor deve ser um número positivo."),
    preco: z
        .number({
            invalid_type_error: "O preço deve ser um número.",
        })
        .positive("O preço deve ser um valor positivo.")
        .multipleOf(0.01, "O preço deve ter no máximo 2 casas decimais.")
        .optional()
        .nullable(),
    prazo_entrega: z
        .string({
            invalid_type_error: "O prazo de entrega deve ser uma string.",
        })
        .min(1, "O prazo de entrega não pode estar vazio.")
        .optional()
        .nullable(),
});

const itemSupplierUpdateSchema = z.object({
    preco: z
        .number({
            invalid_type_error: "O preço deve ser um número.",
        })
        .positive("O preço deve ser um valor positivo.")
        .multipleOf(0.01, "O preço deve ter no máximo 2 casas decimais.")
        .optional()
        .nullable(),
    prazo_entrega: z
        .string({
            invalid_type_error: "O prazo de entrega deve ser uma string.",
        })
        .min(1, "O prazo de entrega não pode estar vazio.")
        .optional()
        .nullable(),
})
.refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Envie pelo menos um campo para atualização.",
    }
);

module.exports = { itemSupplierCreateSchema, itemSupplierUpdateSchema };