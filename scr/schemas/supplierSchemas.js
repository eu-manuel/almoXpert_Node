const { z } = require('zod');

// Regex para validação de CNPJ (formato: XX.XXX.XXX/XXXX-XX)
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

// Regex para validação de telefone (formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX)
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

const supplierCreateSchema = z.object({
  nome: z
    .string({
      required_error: 'O nome é obrigatório.',
      invalid_type_error: 'O nome deve ser uma string.',
    })
    .min(2, 'O nome deve ter pelo menos 2 caracteres.')
    .trim(),

  CNPJ: z
    .string({
      required_error: 'O CNPJ é obrigatório.',
      invalid_type_error: 'O CNPJ deve ser uma string.',
    })
    .regex(cnpjRegex, 'CNPJ inválido. Use o formato: XX.XXX.XXX/XXXX-XX'),

  telefone: z
    .string({
      invalid_type_error: 'O telefone deve ser uma string.',
    })
    .regex(
      phoneRegex,
      'Telefone inválido. Use o formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX'
    )
    .optional(),

  email: z
    .string({
      invalid_type_error: 'O email deve ser uma string.',
    })
    .email('Formato de email inválido.')
    .optional(),

  endereco: z
    .string({
      invalid_type_error: 'O endereço deve ser uma string.',
    })
    .min(5, 'O endereço deve ter pelo menos 5 caracteres.')
    .optional(),
});

const supplierUpdateSchema = z
  .object({
    nome: z
      .string({
        invalid_type_error: 'O nome deve ser uma string.',
      })
      .min(2, 'O nome deve ter pelo menos 2 caracteres.')
      .trim()
      .optional(),

    CNPJ: z
      .string({
        invalid_type_error: 'O CNPJ deve ser uma string.',
      })
      .regex(cnpjRegex, 'CNPJ inválido. Use o formato: XX.XXX.XXX/XXXX-XX')
      .optional(),

    telefone: z
      .string({
        invalid_type_error: 'O telefone deve ser uma string.',
      })
      .regex(
        phoneRegex,
        'Telefone inválido. Use o formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX'
      )
      .optional(),

    email: z
      .string({
        invalid_type_error: 'O email deve ser uma string.',
      })
      .email('Formato de email inválido.')
      .optional(),

    endereco: z
      .string({
        invalid_type_error: 'O endereço deve ser uma string.',
      })
      .min(5, 'O endereço deve ter pelo menos 5 caracteres.')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Envie pelo menos um campo para atualização.',
  });

module.exports = { supplierCreateSchema, supplierUpdateSchema };
