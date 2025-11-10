const { z } = require("zod");

// Enum para status do item
const StatusEnum = z.enum(["ativo", "inativo"]);

// Enum para unidades de medida comuns
const UnidadeMedidaEnum = z.enum(["kg", "g", "un", "cx", "l", "ml", "m", "cm", "m²", "m³"]);

const itemCreateSchema = z.object({
  nome: z
    .string({
      required_error: "O nome é obrigatório.",
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .trim(),

  descricao: z
    .string({
      invalid_type_error: "A descrição deve ser uma string.",
    })
    .optional(),

  codigo_interno: z
    .string({
      required_error: "O código interno é obrigatório.",
      invalid_type_error: "O código interno deve ser uma string.",
    })
    .min(3, "O código interno deve ter pelo menos 3 caracteres.")
    .regex(/^[A-Za-z0-9-]+$/, "O código interno deve conter apenas letras, números e hífen.")
    .trim(),

  unidade_medida: z
    .string({
      required_error: "A unidade de medida é obrigatória.",
      invalid_type_error: "A unidade de medida deve ser uma string.",
    })
    .transform(val => val.toLowerCase())
    .pipe(UnidadeMedidaEnum)
    .or(z.string().min(1, "A unidade de medida não pode estar vazia.")),

  estoque_minimo: z
    .number({
      invalid_type_error: "O estoque mínimo deve ser um número.",
    })
    .int("O estoque mínimo deve ser um número inteiro.")
    .nonnegative("O estoque mínimo não pode ser negativo.")
    .optional()
    .default(0),

  estoque_maximo: z
    .number({
      invalid_type_error: "O estoque máximo deve ser um número.",
    })
    .int("O estoque máximo deve ser um número inteiro.")
    .positive("O estoque máximo deve ser maior que zero.")
    .optional()
    .nullable(),

  status: z
    .string()
    .transform(val => val.toLowerCase())
    .pipe(StatusEnum)
    .default("ativo"),
})
.refine(
  (data) => {
    // Se ambos estoque_minimo e estoque_maximo estiverem definidos
    if (data.estoque_minimo !== undefined && data.estoque_maximo !== null) {
      return data.estoque_minimo <= data.estoque_maximo;
    }
    return true;
  },
  {
    message: "O estoque mínimo não pode ser maior que o estoque máximo.",
    path: ["estoque_minimo"], // Campo que será marcado com o erro
  }
);

const itemUpdateSchema = z.object({
  nome: z
    .string({
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .trim()
    .optional(),

  descricao: z
    .string({
      invalid_type_error: "A descrição deve ser uma string.",
    })
    .optional()
    .nullable(),

  codigo_interno: z
    .string({
      invalid_type_error: "O código interno deve ser uma string.",
    })
    .min(3, "O código interno deve ter pelo menos 3 caracteres.")
    .regex(/^[A-Za-z0-9-]+$/, "O código interno deve conter apenas letras, números e hífen.")
    .trim()
    .optional(),

  unidade_medida: z
    .string({
      invalid_type_error: "A unidade de medida deve ser uma string.",
    })
    .transform(val => val.toLowerCase())
    .pipe(UnidadeMedidaEnum)
    .or(z.string().min(1, "A unidade de medida não pode estar vazia."))
    .optional(),

  estoque_minimo: z
    .number({
      invalid_type_error: "O estoque mínimo deve ser um número.",
    })
    .int("O estoque mínimo deve ser um número inteiro.")
    .nonnegative("O estoque mínimo não pode ser negativo.")
    .optional()
    .nullable(),

  estoque_maximo: z
    .number({
      invalid_type_error: "O estoque máximo deve ser um número.",
    })
    .int("O estoque máximo deve ser um número inteiro.")
    .positive("O estoque máximo deve ser maior que zero.")
    .optional()
    .nullable(),

  status: z
    .string()
    .transform(val => val.toLowerCase())
    .pipe(StatusEnum)
    .optional(),
})
.refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Envie pelo menos um campo para atualização.",
  }
)
.refine(
  (data) => {
    // Se ambos estoque_minimo e estoque_maximo estiverem definidos
    if (data.estoque_minimo !== undefined && 
        data.estoque_maximo !== undefined && 
        data.estoque_maximo !== null && 
        data.estoque_minimo !== null) {
      return data.estoque_minimo <= data.estoque_maximo;
    }
    return true;
  },
  {
    message: "O estoque mínimo não pode ser maior que o estoque máximo.",
    path: ["estoque_minimo"], // Campo que será marcado com o erro
  }
);

module.exports = { itemCreateSchema, itemUpdateSchema };