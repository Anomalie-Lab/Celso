import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly uploadPath = join(process.cwd(), 'uploads', 'comments');

  constructor() {
    this.ensureUploadDirectory();
  }

  private async ensureUploadDirectory() {
    try {
      await fs.access(this.uploadPath);
    } catch {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
  }

  async saveFile(base64Data: string, originalName: string, type: 'image' | 'video'): Promise<string> {
    // Remove o prefixo data:image/...;base64, ou data:video/...;base64,
    const base64String = base64Data.split(',')[1];
    const buffer = Buffer.from(base64String, 'base64');
    
    // Determina a extensão baseada no tipo
    const extension = this.getFileExtension(originalName, type);
    const fileName = `${uuidv4()}.${extension}`;
    const filePath = join(this.uploadPath, fileName);
    
    await fs.writeFile(filePath, buffer);
    
    // Retorna a URL relativa para acessar o arquivo
    return `/uploads/comments/${fileName}`;
  }

  private getFileExtension(originalName: string, type: 'image' | 'video'): string {
    const extension = originalName.split('.').pop()?.toLowerCase();
    
    if (type === 'image') {
      return extension && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension) 
        ? extension 
        : 'jpg';
    } else {
      return extension && ['mp4', 'avi', 'mov', 'webm', 'mkv'].includes(extension) 
        ? extension 
        : 'mp4';
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileName = fileUrl.split('/').pop();
      if (fileName) {
        const filePath = join(this.uploadPath, fileName);
        await fs.unlink(filePath);
      }
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
    }
  }
}
