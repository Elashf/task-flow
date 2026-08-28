import { Priority } from "@/src/generated/prisma/enums";
import z from "zod";

export const createCardSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "card title is required")
    .max(50, "card title must be less than 50 characters"),

  description: z
    .string()
    .trim()
    .max(200, "card description must be less than 200 characters")
    .optional(),

  priority: z.enum(Priority),

  listId: z.string().min(1, "ListId is required"),
});

export const cardIdSchema = z.object({
  cardId: z.string().trim().min(1, "cardId is required"),
});

export const updateCardSchema = z.object({

 title: z
    .string()
    .trim()
    .min(1, "card title is required")
    .max(50, "card title must be less than 50 characters"),
  description: z
    .string()
    .trim()
    .max(200, "card description must be less than 200 characters")
    .optional(),
  priority: z.enum(Priority),
});


export const moveCardSchema = z.object({
    listId: z.
    string().trim().min(1, " List id is required")
})