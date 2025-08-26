import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export interface DashboardMetrics {
  totalProducts: number
  activeUsers: number
  todayOrders: number
  monthlyRevenue: number
  productsChange: string
  usersChange: string
  ordersChange: string
  revenueChange: string
}

export interface TopProduct {
  id: number
  name: string
  sales: number
  revenue: string
  trend: 'up' | 'down'
}

export interface RecentActivity {
  action: string
  time: string
  type: 'order' | 'product' | 'user' | 'alert'
}

export function useDashboard() {
  const dashboardQuery = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async (): Promise<DashboardMetrics> => {
      const { data } = await api.get('/admin/stats')
      return data as DashboardMetrics
    },
    refetchInterval: 30000,
  })

  const topProductsQuery = useQuery({
    queryKey: ['top-products'],
    queryFn: async (): Promise<TopProduct[]> => {
      const { data } = await api.get('/admin/top-products')
      return data as TopProduct[]
    },
    refetchInterval: 60000,
  })

  const recentActivityQuery = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async (): Promise<RecentActivity[]> => {
      const { data } = await api.get('/admin/activity')
      return data as RecentActivity[]
    },
    refetchInterval: 60000,
  })

  return {
    metrics: dashboardQuery.data,
    topProducts: topProductsQuery.data || [],
    recentActivity: recentActivityQuery.data || [],
    isLoading: dashboardQuery.isLoading || topProductsQuery.isLoading || recentActivityQuery.isLoading,
    error: dashboardQuery.error || topProductsQuery.error || recentActivityQuery.error
  }
}
