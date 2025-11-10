const { z } = require("zod");

const userPermissionCreateSchema = z.object({
    id_usuario: z
        .number({
            required_error: "O ID do usuário é obrigatório.",
            invalid_type_error: "O ID do usuário deve ser um número.",
        })
        .int("O ID do usuário deve ser um número inteiro.")
        .positive("O ID do usuário deve ser um número positivo."),
    id_permissao: z
        .number({
            required_error: "O ID da permissão é obrigatório.",
            invalid_type_error: "O ID da permissão deve ser um número.",
        })
        .int("O ID da permissão deve ser um número inteiro.")
        .positive("O ID da permissão deve ser um número positivo."),
});

// Como essa é uma tabela de relacionamento simples, sem atributos adicionais,
// não precisamos de um schema de atualização, pois a relação só pode ser
// criada ou removida, não atualizada.

module.exports = { userPermissionCreateSchema };