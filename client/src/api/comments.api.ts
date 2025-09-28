import { api } from "@/lib/axios.lib";

export interface CommentAttachment {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  thumbnail?: string;
}

export interface Comment {
  id: number;
  message: string;
  rating: number;
  attachments?: CommentAttachment[];
  user_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    fullname: string;
    avatar: string;
  };
}

export interface CreateCommentData {
  message: string;
  rating: number;
  attachments?: CommentAttachment[];
  product_id: number;
}

export interface UpdateCommentData {
  message?: string;
  rating?: number;
  attachments?: CommentAttachment[];
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RatingStats {
  totalComments: number;
  averageRating: number;
  ratingDistribution: {
    rating: number;
    count: number;
  }[];
}

export const commentsApi = {
  // Criar comentário
  async create(data: CreateCommentData): Promise<Comment> {
    const response = await api.post('/comments', data);
    return response.data.data;
  },

  // Buscar comentários de um produto
  async getByProduct(productId: number, page: number = 1, limit: number = 10): Promise<CommentsResponse> {
    const response = await api.get(`/comments/product/${productId}?page=${page}&limit=${limit}`);
    return response.data.data;
  },

  // Buscar estatísticas de avaliação de um produto
  async getProductRatingStats(productId: number): Promise<RatingStats> {
    const response = await api.get(`/comments/product/${productId}/stats`);
    return response.data.data;
  },

  // Buscar comentário do usuário para um produto
  async getUserCommentForProduct(productId: number): Promise<Comment | null> {
    const response = await api.get(`/comments/user/${productId}`);
    return response.data.data;
  },

  // Buscar comentário por ID
  async getById(id: number): Promise<Comment> {
    const response = await api.get(`/comments/${id}`);
    return response.data.data;
  },

  // Atualizar comentário
  async update(id: number, data: UpdateCommentData): Promise<Comment> {
    const response = await api.put(`/comments/${id}`, data);
    return response.data.data;
  },

  // Excluir comentário
  async delete(id: number): Promise<void> {
    await api.delete(`/comments/${id}`);
  },
};
