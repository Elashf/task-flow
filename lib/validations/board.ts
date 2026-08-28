import z from "zod";

export const createBoardSchema = z.object({
    title: z
    .string().trim().min(1, "Board title is required").max(50, "Board title must be less than 50 characters"),

    description: z
    .string().trim().max(200, "Description must be less than 200 characters").optional(),
})

export const updateBoardSchema = z.object({
    title: z
    .string().trim() .min(1, "Board title is required")
    .max(50, "Board title must be less than 50 characters"),
})

export const boardIdSchema = z.object({
  boardId: z
    .string()
    .trim()
    .min(1, "Board ID is required"),
});