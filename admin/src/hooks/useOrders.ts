import { useQuery } from '@tanstack/react-query'
import { orderService, OrderListItem, OrderDetail } from '@/services/orderService'

export function useOrders() {
  const listQuery = useQuery<OrderListItem[]>({
    queryKey: ['orders'],
    queryFn: () => orderService.list(),
    refetchInterval: 30000,
  })

  const getById = (id: number) => useQuery<OrderDetail>({
    queryKey: ['orders', id],
    queryFn: () => orderService.get(id),
    enabled: !!id,
  })

  return {
    orders: listQuery.data || [],
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    refetch: listQuery.refetch,
    getById,
  }
}


