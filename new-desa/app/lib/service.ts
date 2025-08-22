import axios from 'axios';
import type { Article, Articles } from '~/types/articles';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // ganti sesuai backend kamu
  headers: {
    'Content-Type': 'application/json',
  },
});

// CREATE
export async function createArticle(data: Omit<Article, 'id' | 'created_at' | 'updated_at'>) {
  const res = await api.post('/article', data);
  return res.data;
}

// LIST dengan limit & offset
export async function listArticles(limit = 10, offset = 0) {
  const res = await api.get(`/article`, {
    params: {
      limit,
      offset,
    },
  });
  return res.data as Articles;
}

// GET by ID
export async function getArticle(id: number) {
  const res = await api.get(`/article/${id}`);
  return res.data as Article;
}

// UPDATE
export async function updateArticle(id: number, data: Article) {
  const res = await api.put(`/article/${id}`, data);
  return res.data;
}

// DELETE
export async function deleteArticle(id: number) {
  const res = await api.delete(`/article/${id}`);
  return res.data;
}
