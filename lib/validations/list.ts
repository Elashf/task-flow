import z from "zod";

export const createListSchema =z.object({
    title: z.
    string().trim().min(1 , "List title is required")
    .max(50, "List title must be less than 50 characters"),

    boardId: z.string().min(1, "Board ID is required")
})