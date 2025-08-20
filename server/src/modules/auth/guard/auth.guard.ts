import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../../../decorators/public.decorator";
import { verify, JwtPayload } from "jsonwebtoken";
import { LogoutUser } from "src/services/cookies.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const cookies = req.headers.cookie;

    if (!cookies) return false;

    const getCookie = (name: string): string | undefined => {
      return cookies
        .split("; ")
        .find((cookie) => cookie.startsWith(`${name}=`))
        ?.split("=")[1];
    };

    const token = getCookie(process.env.NEXT_SESSION_COOKIE);
    if (!token) return false;

    try {
      const decoded = verify(token, process.env.NEXT_SECRET!) as JwtPayload;

      if (decoded?.user?.expires_at) {
        const now = new Date();
        const expirationDate = new Date(decoded.user.expires_at);
        const daysSinceExpiration = (now.getTime() - expirationDate.getTime()) / (1000 * 60 * 60 * 24);

        if (daysSinceExpiration > 30) {
          LogoutUser(res);
          throw new ForbiddenException("Conta expirada.");
        }
      }

      req.user = { ...decoded.user };
      return true;
    } catch (err) {
      LogoutUser(res);
      return false;
    }
  }
}
