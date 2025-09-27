import { useState, useEffect, useCallback } from 'react';
import { commentsApi, Comment, CreateCommentData, UpdateCommentData, RatingStats } from '@/api/comments.api';
import { useUser } from './user.hook';
import { toast } from 'sonner';

export const useComments = (productId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userComment, setUserComment] = useState<Comment | null>(null);
  const [ratingStats, setRatingStats] = useState<RatingStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { user } = useUser();

  // Carregar comentários do produto
  const loadComments = useCallback(async (page: number = 1) => {
    if (!productId) return;
    
    setIsLoading(true);
    try {
      const response = await commentsApi.getByProduct(productId, page, pagination.limit);
      setComments(response.comments);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
      toast.error('Erro ao carregar comentários');
    } finally {
      setIsLoading(false);
    }
  }, [productId, pagination.limit]);

  // Carregar comentário do usuário
  const loadUserComment = useCallback(async () => {
    if (!productId || !user) return;
    
    try {
      const comment = await commentsApi.getUserCommentForProduct(productId);
      setUserComment(comment);
    } catch (error) {
      console.error('Erro ao carregar comentário do usuário:', error);
    }
  }, [productId, user]);

  // Carregar estatísticas de avaliação
  const loadRatingStats = useCallback(async () => {
    if (!productId) return;
    
    try {
      const stats = await commentsApi.getProductRatingStats(productId);
      setRatingStats(stats);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  }, [productId]);

  // Criar comentário
  const createComment = async (data: Omit<CreateCommentData, 'product_id'>) => {
    if (!user) {
      toast.error('Você precisa estar logado para comentar');
      return null;
    }

    setIsCreating(true);
    try {
      const newComment = await commentsApi.create({
        ...data,
        product_id: productId,
      });
      
      // Adicionar o novo comentário à lista
      setComments(prev => [newComment, ...prev]);
      setUserComment(newComment);
      
      // Recarregar estatísticas
      await loadRatingStats();
      
      toast.success('Comentário criado com sucesso!');
      return newComment;
    } catch (error: unknown) {
      console.error('Erro ao criar comentário:', error);
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erro ao criar comentário';
      toast.error(message);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  // Atualizar comentário
  const updateComment = async (id: number, data: UpdateCommentData) => {
    setIsUpdating(true);
    try {
      const updatedComment = await commentsApi.update(id, data);
      
      // Atualizar na lista de comentários
      setComments(prev => prev.map(comment => 
        comment.id === id ? updatedComment : comment
      ));
      
      // Atualizar comentário do usuário se for o mesmo
      if (userComment?.id === id) {
        setUserComment(updatedComment);
      }
      
      // Recarregar estatísticas
      await loadRatingStats();
      
      toast.success('Comentário atualizado com sucesso!');
      return updatedComment;
    } catch (error: unknown) {
      console.error('Erro ao atualizar comentário:', error);
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erro ao atualizar comentário';
      toast.error(message);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  // Excluir comentário
  const deleteComment = async (id: number) => {
    setIsDeleting(true);
    try {
      await commentsApi.delete(id);
      
      // Remover da lista de comentários
      setComments(prev => prev.filter(comment => comment.id !== id));
      
      // Limpar comentário do usuário se for o mesmo
      if (userComment?.id === id) {
        setUserComment(null);
      }
      
      // Recarregar estatísticas
      await loadRatingStats();
      
      toast.success('Comentário excluído com sucesso!');
    } catch (error: unknown) {
      console.error('Erro ao excluir comentário:', error);
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erro ao excluir comentário';
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    if (productId) {
      loadComments();
      loadUserComment();
      loadRatingStats();
    }
  }, [productId, user, loadComments, loadUserComment, loadRatingStats]);

  return {
    comments,
    userComment,
    ratingStats,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    pagination,
    loadComments,
    createComment,
    updateComment,
    deleteComment,
    canComment: !!user && !userComment, // Usuário pode comentar se estiver logado e não tiver comentado ainda
  };
};
