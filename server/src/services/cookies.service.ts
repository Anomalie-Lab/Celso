import { HttpException, HttpStatus } from "@nestjs/common";
import { Response, Request } from "express";
import { VerifyErrors, sign, verify } from "jsonwebtoken";

export const LoginUser = (res: Response, user: Account.UserI) => {
  const token = sign({ user }, process.env.NEXT_SECRET, { expiresIn: "7d" });
  res.cookie(process.env.NEXT_PUBLIC_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    sameSite: "lax",
    domain: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? ".daeshis.site" : undefined,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie(process.env.NEXT_PUBLIC_IS_IN_SESSION, "true", {
    httpOnly: false,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
    sameSite: "lax",
    domain: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? ".daeshis.site" : undefined,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const LogoutUser = (res: Response) => {
  res
    .cookie(process.env.NEXT_PUBLIC_SESSION_COOKIE, "", {
      httpOnly: false,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      sameSite: "lax",
      domain: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? ".daeshis.site" : undefined,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .cookie(process.env.NEXT_PUBLIC_IS_IN_SESSION, "", {
      httpOnly: false,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      sameSite: "lax",
      domain: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? ".daeshis.site" : undefined,
      maxAge: 0,
    })
   
};

export const GetSessionToken = (res: Response, req: Request) => {
  const token = req.cookies[process.env.NEXT_PUBLIC_SESSION_COOKIE];

  if (!token) throw new HttpException("Usuário desconectado.", HttpStatus.BAD_REQUEST);

  const user = verify(token, process.env.NEXT_SECRET, (err: VerifyErrors | null, decoded: Auth.UserSessionI) => {
    if (err) {
      LogoutUser(res);
      throw new HttpException("Usuário desconectado.", HttpStatus.BAD_REQUEST);
    }
    return decoded.user;
  });
  return user;
};
