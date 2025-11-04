const { z } = require("zod");

const itemCategoryCreateSchema = z.object({
    id_item: z
        .number({
            required_error: "O ID do item é obrigatório.",
            invalid_type_error: "O ID do item deve ser um número.",
        })
        .int("O ID do item deve ser um número inteiro.")
        .positive("O ID do item deve ser um número positivo."),
    id_categoria: z
        .number({
            required_error: "O ID da categoria é obrigatório.",
            invalid_type_error: "O ID da categoria deve ser um número.",
        })
        .int("O ID da categoria deve ser um número inteiro.")
        .positive("O ID da categoria deve ser um número positivo."),
});

// Como essa é uma tabela de relacionamento simples, sem atributos adicionais,
// não precisamos de um schema de atualização, pois a relação só pode ser
// criada ou removida, não atualizada.

module.exports = { itemCategoryCreateSchema };