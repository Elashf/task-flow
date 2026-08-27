import { Priority } from "@/src/generated/prisma/enums";
import z from "zod";

export const createCardSchema = z.object({
    title:z.
    string().trim().min(1, "card title is required").max(50, "List title must be less than 50 characters"),

    description: z.string().trim().max(200, "card description must be less than 200 characters").optional(),

    priority:z.enum(Priority),
    
    listId: z.string().min(1, "CardId is required"),
})