import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createArticle, deleteArticle, getArticle, listArticles, updateArticle } from '~/lib/service';
import { type Article } from '~/types/articles';

// LIST
export function useArticles(limit : number, offset : number) {
  return useQuery({
    queryKey: ['articles', limit, offset],
    queryFn: () => listArticles(limit, offset),
  });
}

// GET by IDA
export function useArticle(id: number) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getArticle(id),
    enabled: !!id,
  });
}

// CREATE
export function useCreateArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createArticle,
    onSuccess: (data: Article) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast('Article created!', {
        description: `Article titled "${data.title}" has been created successfully.`,
      });
    },
    onError: (error: any) => {
      toast('Failed to create article.', {
        description: error?.message ?? 'Please try again.',
      });
    },
  });
}

// UPDATE
export function useUpdateArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Article }) => updateArticle(id, data),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      toast('Article updated!', {
        description: `Article titled "${data.title}" has been updated successfully.`,
      });
    },
    onError: (error: any) => {
      toast('Failed to update article.', {
        description: error?.message ?? 'Please try again.',
      });
    },
  });
}

// DELETE
export function useDeleteArticle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: (error: any) => {
      toast('Failed to delete article.', {
        description: error?.message ?? 'Please try again.',
      });
    },
  });
}
