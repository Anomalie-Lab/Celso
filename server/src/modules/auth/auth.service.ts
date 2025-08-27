import { RegisterDto, LoginDto, ResetPasswordUserDto } from 'src/dtos/auth.dto';
import {
  GetGoogleOAuthToken,
  GetGoogleUser,
} from '../../services/google.service';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { HandleErrorsUserConflict } from '../../utils/handle-errors-database.util';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PasswordResetHtml } from '../../templates/password-reset';
import { LoginUser } from '../../services/cookies.service';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { generateUsername } from 'src/utils/generate.util';
import { AuthRepository } from 'src/repositories';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register({ password, ...dto }: RegisterDto, res: ExpressResponse) {
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await this.authRepository.create({
        username: dto.username ?? generateUsername(),
        password: passwordHash,
        ...dto,
      });
      const token = sign(
        { username: dto.username, password: password },
        process.env.NEXT_SECRET,
      );
      const link = `${process.env.VITE_API_URL}auth/login/token/${token}`;

      // await axios.post("https://marketinglead.app.n8n.cloud/webhook/b23798ff-33f5-4f2b-a46d-47e259a35591", {
      //   body: { name: dto.fullname, email: dto.email, password: dto.password, link },
      // });

      LoginUser(res, user);
      return user;
    } catch (error) {
      HandleErrorsUserConflict(error);
    }
  }

  async login(dto: LoginDto, res: ExpressResponse) {
    try {
      const user = await this.authRepository.findByCredential(dto.email);
      if (!user)
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );

      const isValidPassword = await bcrypt.compare(dto.password, user.password);
      if (!isValidPassword)
        throw new HttpException('Senha incorreta.', HttpStatus.UNAUTHORIZED);
      LoginUser(res, user);
      return user;
    } catch (error) {
      console.log(error);
      HandleErrorsUserConflict(error);
    }
  }

  async google(res: ExpressResponse, req: ExpressRequest) {
    const { code } = req.query;
    try {
      if (!code) throw new Error('Não tem um código.');

      const { access_token, id_token } = await GetGoogleOAuthToken(
        code as string,
      );

      const user_google = await GetGoogleUser(access_token, id_token);

      let user = await this.authRepository.findGoogleAccount(user_google.email);

      if (!user)
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NOT_FOUND,
        );

      LoginUser(res, user);

      return res
        .status(HttpStatus.OK)
        .redirect(process.env.NEXT_PUBLIC_APP_URL);
    } catch (error: any) {
      HandleErrorsUserConflict(error);
    }
  }

  async forgotPassword(res: ExpressResponse, email: string) {
    try {
      const user = await this.authRepository.findAccountByEmail(email);
      if (!user)
        throw new HttpException('Conta não encontrada.', HttpStatus.NOT_FOUND);

      const token = await this.authRepository.createPasswordReset(
        email,
        user.id,
      );
      const link = `${process.env.VITE_APP_URL}update-password/${encodeURIComponent(email)}/${token.token}`;
      const html = await PasswordResetHtml(link);

      // await axios.post("https://marketinglead.app.n8n.cloud/webhook/40c692fc-e19b-448b-a21c-d1197f8d8246", { email, urlConfirmEmail: link, nameUser: user.fullname });

      return res.status(200).end();
    } catch (error) {
      HandleErrorsUserConflict(error);
    }
  }

  async resetPassword(res: ExpressResponse, dto: ResetPasswordUserDto) {
    try {
      const { email, id } = verify(dto.token, process.env.NEXT_SECRET) as {
        email: string;
        id: number;
      };

      if (email !== dto.email)
        throw new HttpException(
          'The emails do not match.',
          HttpStatus.NOT_ACCEPTABLE,
        );

      const used = await this.authRepository.getTokenResetPassword(dto.token);

      if (used?.used) throw new Error('The link is expired or invalid.');

      const salt = await bcrypt.genSalt(12);
      const password = await bcrypt.hash(dto.password, salt);

      await this.authRepository.updatePassword(id, password, dto.token);

      return res.status(200).end();
    } catch {
      throw new HttpException(
        'The link is expired or invalid.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
