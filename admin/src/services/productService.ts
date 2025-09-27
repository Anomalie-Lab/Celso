import api from '@/lib/api'
import { ProductFormData, ProductWithRelations } from '@/types/database'

export const productService = {
  async getAll(): Promise<ProductWithRelations[]> {
    try {
      const response = await api.get('/admin/products')
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw new Error('Falha ao buscar produtos')
    }
  },

  async getById(id: number): Promise<ProductWithRelations | null> {
    try {
      const response = await api.get(`/products/${id}`) // Mantém rota pública para detalhes
      return response.data
    } catch (error) {
      console.error('Error fetching product:', error)
      throw new Error('Falha ao buscar produto')
    }
  },

  async create(data: ProductFormData): Promise<ProductWithRelations> {
    try {
      const response = await api.post('/admin/products', data)
      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw new Error('Falha ao criar produto')
    }
  },

  async update(id: number, data: ProductFormData): Promise<ProductWithRelations> {
    try {
      const response = await api.put(`/admin/products/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating product:', error)
      throw new Error('Falha ao atualizar produto')
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/admin/products/${id}`)
    } catch (error) {
      console.error('Error deleting product:', error)
      throw new Error('Falha ao excluir produto')
    }
  },

  async updateStock(id: number, stock: number): Promise<ProductWithRelations> {
    try {
      const response = await api.patch(`/admin/products/${id}/stock`, { stock })
      return response.data
    } catch (error) {
      console.error('Error updating stock:', error)
      throw new Error('Falha ao atualizar estoque')
    }
  },

  async search(query: string): Promise<ProductWithRelations[]> {
    try {
      const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`) // Mantém rota pública para busca
      return response.data
    } catch (error) {
      console.error('Error searching products:', error)
      throw new Error('Falha ao buscar produtos')
    }
  }
}
