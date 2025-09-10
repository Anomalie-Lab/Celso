import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
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
import { CommentsService } from '../../services/comments.service';
import { CreateCommentDto, UpdateCommentDto, CommentResponseDto } from '../../dtos/comments.dto';
import { User } from '../../decorators/user.decorator';
import type { Response } from 'express';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo comentário' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'Comentário criado com sucesso', type: CommentResponseDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou usuário já comentou neste produto' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: Account.UserI,
    @Res() res: Response,
  ) {
    try {
      const comment = await this.commentsService.create(createCommentDto, user.id!);
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Comentário criado com sucesso',
        data: comment,
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Buscar comentários de um produto' })
  @ApiParam({ name: 'productId', description: 'ID do produto' })
  @ApiQuery({ name: 'page', required: false, description: 'Página (padrão: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limite por página (padrão: 10)' })
  @ApiResponse({ status: 200, description: 'Comentários encontrados' })
  async findByProductId(
    @Param('productId') productId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Res() res: Response,
  ) {
    try {
      const result = await this.commentsService.findByProductId(
        parseInt(productId),
        parseInt(page),
        parseInt(limit),
      );
      return res.status(HttpStatus.OK).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('product/:productId/stats')
  @ApiOperation({ summary: 'Buscar estatísticas de avaliação de um produto' })
  @ApiParam({ name: 'productId', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Estatísticas encontradas' })
  async getProductRatingStats(
    @Param('productId') productId: string,
    @Res() res: Response,
  ) {
    try {
      const stats = await this.commentsService.getProductRatingStats(parseInt(productId));
      return res.status(HttpStatus.OK).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get('user/:productId')
  @ApiOperation({ summary: 'Buscar comentário do usuário para um produto' })
  @ApiParam({ name: 'productId', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Comentário encontrado ou null' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async getUserCommentForProduct(
    @Param('productId') productId: string,
    @User() user: Account.UserI,
    @Res() res: Response,
  ) {
    try {
      const comment = await this.commentsService.getUserCommentForProduct(user.id!, parseInt(productId));
      return res.status(HttpStatus.OK).json({
        success: true,
        data: comment,
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar comentário por ID' })
  @ApiParam({ name: 'id', description: 'ID do comentário' })
  @ApiResponse({ status: 200, description: 'Comentário encontrado', type: CommentResponseDto })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  async findById(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const comment = await this.commentsService.findById(parseInt(id));
      return res.status(HttpStatus.OK).json({
        success: true,
        data: comment,
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar comentário' })
  @ApiParam({ name: 'id', description: 'ID do comentário' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ status: 200, description: 'Comentário atualizado com sucesso', type: CommentResponseDto })
  @ApiResponse({ status: 403, description: 'Sem permissão para editar este comentário' })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @User() user: Account.UserI,
    @Res() res: Response,
  ) {
    try {
      const comment = await this.commentsService.update(parseInt(id), updateCommentDto, user.id!);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Comentário atualizado com sucesso',
        data: comment,
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir comentário' })
  @ApiParam({ name: 'id', description: 'ID do comentário' })
  @ApiResponse({ status: 200, description: 'Comentário excluído com sucesso' })
  @ApiResponse({ status: 403, description: 'Sem permissão para excluir este comentário' })
  @ApiResponse({ status: 404, description: 'Comentário não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async delete(
    @Param('id') id: string,
    @User() user: Account.UserI,
    @Res() res: Response,
  ) {
    try {
      await this.commentsService.delete(parseInt(id), user.id!);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Comentário excluído com sucesso',
      });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
