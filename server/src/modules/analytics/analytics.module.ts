import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { PrismaService } from '../../services/prisma.service';
import { AnalyticsRepository } from '../../repositories/analytics/analytics.repository';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsRepository, PrismaService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
