import { z } from "zod"

export const createArticleSchema = z.object({
  title: z.string().min(20, 'Title must be at least 20 characters').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(200, 'Content must be at least 200 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters').max(50, 'Category must be less than 50 characters'),
  status: z.enum(['publish', 'draft', 'trash']),
});

export const updateArticleSchema = z.object({
  title: z.string().min(20, 'Title must be at least 20 characters').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(200, 'Content must be at least 200 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters').max(50, 'Category must be less than 50 characters'),
  status: z.enum(['publish', 'draft', 'trash']),
});

export type CreateArticleFormData = z.infer<typeof createArticleSchema>
export type UpdateArticleFormData = z.infer<typeof updateArticleSchema>
