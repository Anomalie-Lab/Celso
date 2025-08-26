import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationService, NotificationDTO, NotificationItem } from '@/services/notificationService'

export function useNotifications() {
  const qc = useQueryClient()

  const listQuery = useQuery<NotificationItem[]>({
    queryKey: ['notifications'],
    queryFn: () => notificationService.listMine(),
    refetchInterval: 30000,
  })

  const createMutation = useMutation({
    mutationFn: (dto: NotificationDTO) => notificationService.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const readMutation = useMutation({
    mutationFn: (id: number) => notificationService.markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications'] }),
  })

  return {
    notifications: listQuery.data || [],
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    create: createMutation.mutateAsync,
    markRead: readMutation.mutateAsync,
  }
}


