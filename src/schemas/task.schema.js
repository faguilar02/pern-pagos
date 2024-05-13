import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "El título es requerido",
      invalid_type_error: "El título debe ser un texto",
    })
    .min(1)
    .max(255),
  description: z
    .string({
      required_error: "La descripción es requerida",
      invalid_type_error: "La descripción debe ser un texto",
    })
    .min(1)
    .max(255)
    .optional(),
  due_date: z
    .string({
      required_error: "La fecha de vencimiento es requerida",
      invalid_type_error: "La fecha de vencimiento debe ser un texto",
    })
    .refine((val) => new Date(val) > new Date(), {
      message: "La fecha de vencimiento debe ser una fecha futura",
    })
    .optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string({
      required_error: "El título es requerido",
      invalid_type_error: "El título debe ser un texto",
    })
    .min(1)
    .max(255)
    .optional(),
  description: z
    .string({
      required_error: "La descripción es requerida",
      invalid_type_error: "La descripción debe ser un texto",
    })
    .min(1)
    .max(255)
    .optional(),
  due_date: z
    .string({
      invalid_type_error: "La fecha de vencimiento debe ser un texto",
    })
    .refine(
      (val) => {
        if (!val) return true; // permitir vacío
        const date = new Date(val);
        const now = new Date();
        return date > now;
      },
      {
        message: "La fecha de vencimiento debe ser una fecha futura",
      }
    )
    .optional(),
});
