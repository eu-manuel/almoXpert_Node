const { z } = require('zod');

const permissionCreateSchema = z.object({
  nome: z
    .string({
      required_error: 'O nome da permissão é obrigatório.',
      invalid_type_error: 'O nome da permissão deve ser uma string.',
    })
    .min(1, 'O nome da permissão não pode estar vazio.')
    .max(255, 'O nome da permissão não pode ter mais de 255 caracteres.'),
  descricao: z
    .string({
      invalid_type_error: 'A descrição deve ser uma string.',
    })
    .max(255, 'A descrição não pode ter mais de 255 caracteres.')
    .optional(),
});

const permissionUpdateSchema = z
  .object({
    nome: z
      .string({
        invalid_type_error: 'O nome da permissão deve ser uma string.',
      })
      .min(1, 'O nome da permissão não pode estar vazio.')
      .max(255, 'O nome da permissão não pode ter mais de 255 caracteres.')
      .optional(),
    descricao: z
      .string({
        invalid_type_error: 'A descrição deve ser uma string.',
      })
      .max(255, 'A descrição não pode ter mais de 255 caracteres.')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Envie pelo menos um campo para atualização (nome ou descrição).',
  });

module.exports = { permissionCreateSchema, permissionUpdateSchema };
