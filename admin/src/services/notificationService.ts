import api from '@/lib/api'

export interface NotificationDTO {
  type: string
  title: string
  message: string
  read_at?: string | null
  data?: Record<string, any>
  users: number[]
}

export interface NotificationItem {
  id: number
  user_id: number
  type: string
  title: string
  message: string
  read_at: string | null
  data?: Record<string, any> | null
  created_at: string
}

export const notificationService = {
  async listMine(): Promise<NotificationItem[]> {
    const { data } = await api.get('/notification')
    return data
  },
  async create(dto: NotificationDTO): Promise<NotificationItem[] | NotificationItem> {
    const { data } = await api.post('/notification', dto)
    return data
  },
  async markRead(id: number): Promise<NotificationItem> {
    const { data } = await api.patch(`/notification/read/${id}`)
    return data
  },
}


