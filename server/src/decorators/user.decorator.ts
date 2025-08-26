import {createParamDecorator, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {verify} from 'jsonwebtoken';

export const User = createParamDecorator((_: unknown, context: ExecutionContext): Account.UserI => {
  const request = context.switchToHttp().getRequest();
  const cookies = request.cookies;

  const token = cookies[process.env.NEXT_PUBLIC_SESSION_COOKIE];
  if (!token) throw new UnauthorizedException('Token not found in cookies');

  try {
    const {user} = verify(token, process.env.NEXT_SECRET) as {user: Account.UserI; iat: number; exp: number};
    return user;
  } catch (error) {
    throw new UnauthorizedException('Invalid or expired token');
  }
});
