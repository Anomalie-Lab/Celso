"use server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "./utils/app-routes.util";

async function isLogged() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get(process.env.NEXT_PUBLIC_SESSION_COOKIE || "authToken")?.value);
}

let routeHistory: any = [];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const host = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const currentRoute = request.nextUrl.pathname;
  routeHistory.push(currentRoute);

  if (routeHistory.length > 10) routeHistory.shift();

  const appPrivateRoutes = Object.values(APP_ROUTES.private).map((route) => route.name);
  const isPrivateRoute = appPrivateRoutes.includes(pathname);

  const logged = await isLogged();
  if (isPrivateRoute && !logged) return NextResponse.redirect(`${host}/`);

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/minha-conta", "/search", "/sobre-nos", "/troca-devolucao", "/politica-privacidade", "/perguntas-frequentes", "/formas-pagamento", "/fale-conosco", "/conditions", "/terms"],
};
