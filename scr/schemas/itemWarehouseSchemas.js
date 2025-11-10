const { z } = require("zod");

const itemWarehouseCreateSchema = z.object({
    id_item: z
        .number({
            required_error: "O ID do item é obrigatório.",
            invalid_type_error: "O ID do item deve ser um número.",
        })
        .int("O ID do item deve ser um número inteiro.")
        .positive("O ID do item deve ser um número positivo."),
    id_almoxarifado: z
        .number({
            required_error: "O ID do almoxarifado é obrigatório.",
            invalid_type_error: "O ID do almoxarifado deve ser um número.",
        })
        .int("O ID do almoxarifado deve ser um número inteiro.")
        .positive("O ID do almoxarifado deve ser um número positivo."),
    quantidade: z
        .number({
            required_error: "A quantidade é obrigatória.",
            invalid_type_error: "A quantidade deve ser um número.",
        })
        .int("A quantidade deve ser um número inteiro.")
        .min(0, "A quantidade não pode ser negativa."),
    data_entrada: z
        .string({
            invalid_type_error: "A data de entrada deve ser uma string no formato ISO.",
        })
        .datetime({
            message: "A data de entrada deve estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).",
        })
        .optional(),
    data_saida: z
        .string({
            invalid_type_error: "A data de saída deve ser uma string no formato ISO.",
        })
        .datetime({
            message: "A data de saída deve estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).",
        })
        .optional()
        .nullable(),
});

const itemWarehouseUpdateSchema = z.object({
    quantidade: z
        .number({
            invalid_type_error: "A quantidade deve ser um número.",
        })
        .int("A quantidade deve ser um número inteiro.")
        .min(0, "A quantidade não pode ser negativa.")
        .optional(),
    data_entrada: z
        .string({
            invalid_type_error: "A data de entrada deve ser uma string no formato ISO.",
        })
        .datetime({
            message: "A data de entrada deve estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).",
        })
        .optional(),
    data_saida: z
        .string({
            invalid_type_error: "A data de saída deve ser uma string no formato ISO.",
        })
        .datetime({
            message: "A data de saída deve estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).",
        })
        .optional()
        .nullable(),
})
.refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Envie pelo menos um campo para atualização.",
    }
);

module.exports = { itemWarehouseCreateSchema, itemWarehouseUpdateSchema };