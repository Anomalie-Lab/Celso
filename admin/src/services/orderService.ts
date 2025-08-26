import api from '@/lib/api'

export interface OrderListItem {
  id: number
  user: { id: number; fullname: string; email: string }
  total_amount: number
  status: string
  payment_method: string
  created_at: string
}

export interface OrderDetail extends OrderListItem {
  invoices: any[]
  histories: any[]
}

export const orderService = {
  async list(): Promise<OrderListItem[]> {
    const { data } = await api.get('/admin/orders')
    return data
  },
  async get(id: number): Promise<OrderDetail> {
    const { data } = await api.get(`/account/orders/${id}`)
    return data
  },
}


