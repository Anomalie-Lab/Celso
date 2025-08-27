import api from '@/lib/api'
import { UserWithRelations } from '@/types/database'

export const userService = {
  async getAll(): Promise<UserWithRelations[]> {
    try {
      const response = await api.get('/admin/users')
      return response.data
    } catch (error) {
      console.error('Error fetching users:', error)
      throw new Error('Falha ao buscar usuários')
    }
  },

  async getById(id: number): Promise<UserWithRelations | null> {
    try {
      const response = await api.get(`/admin/users/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      throw new Error('Falha ao buscar usuário')
    }
  },

  async search(query: string): Promise<UserWithRelations[]> {
    try {
      const response = await api.get(`/admin/users/search?q=${encodeURIComponent(query)}`)
      return response.data
    } catch (error) {
      console.error('Error searching users:', error)
      throw new Error('Falha ao buscar usuários')
    }
  }
}
