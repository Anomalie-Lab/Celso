import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    Query,
    Req,
    HttpStatus,
    Res,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBody,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto, AnalyticsQueryDto } from '../../dtos/analytics.dto';
import { isPublic } from '../../decorators/public.decorator';
import { User } from '../../decorators/user.decorator';
import type { Request, Response } from 'express';
import { isAdmin } from 'src/decorators/admin.decorator';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post('track')
    @isPublic()
    @ApiOperation({ summary: 'Registrar evento de analytics' })
    @ApiBody({ type: CreateAnalyticsDto })
    @ApiResponse({ status: 201, description: 'Evento registrado com sucesso' })
      async trackEvent(
    @Body() data: CreateAnalyticsDto,
    @Req() req: Request,
    @User() user?: any,
  ) {
    // Extrair informações da requisição
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip || req.connection.remoteAddress;
    const referrer = req.headers.referer || req.headers.referrer;

    const analyticsData = {
      ...data,
      user_agent: userAgent,
      ip_address: ipAddress,
      referrer: referrer as string,
      user_id: user?.id,
    };

    const result = await this.analyticsService.trackEvent(analyticsData);
    
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Evento registrado com sucesso',
      data: result,
    };
  }

    @Get('product/:id')
    @isPublic()
    @ApiOperation({ summary: 'Obter analytics de um produto específico' })
    @ApiParam({ name: 'id', description: 'ID do produto' })
    @ApiQuery({ name: 'days', required: false, description: 'Número de dias para análise' })
    @ApiResponse({ status: 200, description: 'Analytics do produto' })
    async getProductAnalytics(
        @Param('id') productId: string,
        @Query('days') days?: number,
    ) {
        const analytics = await this.analyticsService.getProductAnalytics(
            parseInt(productId),
            days || 30,
        );

        return {
            statusCode: HttpStatus.OK,
            data: analytics,
        };
    }

    @Get('summary')
    @isPublic()
    @ApiOperation({ summary: 'Obter resumo geral de analytics' })
    @ApiQuery({ name: 'days', required: false, description: 'Número de dias para análise' })
    @ApiResponse({ status: 200, description: 'Resumo de analytics' })
    async getAnalyticsSummary(@Query('days') days?: number) {
        const summary = await this.analyticsService.getAnalyticsSummary(days || 30);

        return {
            statusCode: HttpStatus.OK,
            data: summary,
        };
    }

    @Get('range')
    @isPublic()
    @ApiOperation({ summary: 'Obter analytics por período' })
    @ApiQuery({ name: 'startDate', required: false, description: 'Data de início' })
    @ApiQuery({ name: 'endDate', required: false, description: 'Data de fim' })
    @ApiQuery({ name: 'days', required: false, description: 'Número de dias para análise' })
    @ApiResponse({ status: 200, description: 'Analytics do período' })
    async getAnalyticsByDateRange(@Query() query: AnalyticsQueryDto) {
        const analytics = await this.analyticsService.getAnalyticsByDateRange(query);

        return {
            statusCode: HttpStatus.OK,
            data: analytics,
        };
    }

    @Get('product/:id/funnel')
    @isPublic()
    @ApiOperation({ summary: 'Obter funil de conversão de um produto' })
    @ApiParam({ name: 'id', description: 'ID do produto' })
    @ApiQuery({ name: 'days', required: false, description: 'Número de dias para análise' })
    @ApiResponse({ status: 200, description: 'Funil de conversão do produto' })
    async getProductConversionFunnel(
        @Param('id') productId: string,
        @Query('days') days?: number,
    ) {
        const funnel = await this.analyticsService.getProductConversionFunnel(
            parseInt(productId),
            days || 30,
        );

        return {
            statusCode: HttpStatus.OK,
            data: funnel,
        };
    }
}
