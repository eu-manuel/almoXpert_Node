const { z } = require('zod');

const movementCreateSchema = z.object({
  tipo: z.enum(['entrada', 'saida', 'transferencia', 'ajuste'], {
    required_error: 'O tipo de movimentação é obrigatório.',
    invalid_type_error:
      "O tipo deve ser 'entrada', 'saida', 'transferencia' ou 'ajuste'.",
  }),
  data_movimentacao: z
    .string({
      invalid_type_error: 'A data deve ser uma string no formato ISO.',
    })
    .datetime({
      message:
        'A data deve estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).',
    })
    .optional(),
  quantidade: z
    .number({
      required_error: 'A quantidade é obrigatória.',
      invalid_type_error: 'A quantidade deve ser um número.',
    })
    .int('A quantidade deve ser um número inteiro.')
    .positive('A quantidade deve ser um número positivo.'),
  observacao: z
    .string({
      invalid_type_error: 'A observação deve ser uma string.',
    })
    .optional(),
  id_item: z
    .number({
      required_error: 'O ID do item é obrigatório.',
      invalid_type_error: 'O ID do item deve ser um número.',
    })
    .int('O ID do item deve ser um número inteiro.')
    .positive('O ID do item deve ser um número positivo.'),
  id_almoxarifado: z
    .number({
      required_error: 'O ID do almoxarifado é obrigatório.',
      invalid_type_error: 'O ID do almoxarifado deve ser um número.',
    })
    .int('O ID do almoxarifado deve ser um número inteiro.')
    .positive('O ID do almoxarifado deve ser um número positivo.'),
  id_usuario: z
    .number({
      required_error: 'O ID do usuário é obrigatório.',
      invalid_type_error: 'O ID do usuário deve ser um número.',
    })
    .int('O ID do usuário deve ser um número inteiro.')
    .positive('O ID do usuário deve ser um número positivo.'),
});

const movementUpdateSchema = z
  .object({
    tipo: z
      .enum(['entrada', 'saida', 'transferencia', 'ajuste'], {
        invalid_type_error:
          "O tipo deve ser 'entrada', 'saida', 'transferencia' ou 'ajuste'.",
      })
      .optional(),
    data_movimentacao: z
      .string({
        invalid_type_error: 'A data deve ser uma string no formato ISO.',
      })
      .datetime({
        message:
          'A data deve estar no formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).',
      })
      .optional(),
    quantidade: z
      .number({
        invalid_type_error: 'A quantidade deve ser um número.',
      })
      .int('A quantidade deve ser um número inteiro.')
      .positive('A quantidade deve ser um número positivo.')
      .optional(),
    observacao: z
      .string({
        invalid_type_error: 'A observação deve ser uma string.',
      })
      .optional(),
    id_item: z
      .number({
        invalid_type_error: 'O ID do item deve ser um número.',
      })
      .int('O ID do item deve ser um número inteiro.')
      .positive('O ID do item deve ser um número positivo.')
      .optional(),
    id_almoxarifado: z
      .number({
        invalid_type_error: 'O ID do almoxarifado deve ser um número.',
      })
      .int('O ID do almoxarifado deve ser um número inteiro.')
      .positive('O ID do almoxarifado deve ser um número positivo.')
      .optional(),
    id_usuario: z
      .number({
        invalid_type_error: 'O ID do usuário deve ser um número.',
      })
      .int('O ID do usuário deve ser um número inteiro.')
      .positive('O ID do usuário deve ser um número positivo.')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Envie pelo menos um campo para atualização.',
  });

module.exports = { movementCreateSchema, movementUpdateSchema };
