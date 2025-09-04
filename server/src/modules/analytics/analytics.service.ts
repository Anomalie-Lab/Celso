import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '../../repositories/analytics/analytics.repository';
import { CreateAnalyticsDto, AnalyticsQueryDto } from '../../dtos/analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly analyticsRepository: AnalyticsRepository) {}

  async trackEvent(data: CreateAnalyticsDto) {
    console.log('🔧 Analytics Service: Processando evento', data);
    try {
      const result = await this.analyticsRepository.create(data);
      console.log('🔧 Analytics Service: Evento criado', result);
      return result;
    } catch (error) {
      console.error('🔧 Analytics Service: Erro ao criar evento', error);
      throw error;
    }
  }

  async getProductAnalytics(productId: number, days: number = 30) {
    return this.analyticsRepository.getProductAnalytics(productId, days);
  }

  async getAnalyticsSummary(days: number = 30) {
    return this.analyticsRepository.getAnalyticsSummary(days);
  }

  async getAnalyticsByDateRange(query: AnalyticsQueryDto) {
    const startDate = query.startDate ? new Date(query.startDate) : new Date();
    const endDate = query.endDate ? new Date(query.endDate) : new Date();
    
    if (query.days && !query.startDate) {
      startDate.setDate(startDate.getDate() - query.days);
    }

    return this.analyticsRepository.getAnalyticsByDateRange(startDate, endDate);
  }

  async getProductConversionFunnel(productId: number, days: number = 30) {
    return this.analyticsRepository.getProductConversionFunnel(productId, days);
  }
}
