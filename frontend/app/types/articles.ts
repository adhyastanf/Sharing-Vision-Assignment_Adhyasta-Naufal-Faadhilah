export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  status: 'publish' | 'draft' | 'trash';
  created_at: Date;
  updated_at: Date;
}

export interface Articles {
  posts: Article[];
  total_count: number;
  limit: number;
  offset: number;
}

export interface CreateArticleData {
  title: string;
  content: string;
  category: string;
  status: 'publish' | 'draft' | 'trash';
}

export interface UpdateArticleData {
  title?: string;
  content?: string;
  category?: string;
  status?: 'publish' | 'draft' | 'trash';
}

export type ArticleStatus = 'publish' | 'draft' | 'trash';
