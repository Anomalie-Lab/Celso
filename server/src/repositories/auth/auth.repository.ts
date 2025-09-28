import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../services/prisma.service';
import * as jwt from 'jsonwebtoken';
import {RegisterDto} from 'src/dtos/auth.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: RegisterDto & {username: string}) {
    return await this.prisma.user.create({data: {...dto, avatar: 'https://ui-avatars.com/api/?name=John+Doe', enable_2fa: false}});
  }

  async updateUser(id: number, data: any) {
    return await this.prisma.user.update({where: {id}, data});
  }

  async findById(id: number) {
    return await this.prisma.user.findFirst({where: {id}});
  }

  async findByCredential(credential: string) {
    return await this.prisma.user.findFirst({where: {OR: [{email: credential}, {username: credential}]}});
  }

  async findGoogleAccount(email: string) {
    return await this.prisma.user.findFirst({where: {email}});
  }

  async findAccountByEmail(email: string) {
    return await this.prisma.user.findFirst({where: {email}});
  }

  async createPasswordReset(email: string, id: number) {
    const token = jwt.sign({email, id}, process.env.NEXT_SECRET, {expiresIn: '1h'});
    return await this.prisma.passwordReset.create({data: {email, token}});
  }

  async updatePassword(id: number, password: string, token: string) {
    await this.prisma.user.update({where: {id}, data: {password}});
    return await this.prisma.passwordReset.update({where: {token}, data: {used: true}});
  }

  async getTokenResetPassword(token: string) {
    return await this.prisma.passwordReset.findFirst({where: {token}, select: {used: true}});
  }
}
