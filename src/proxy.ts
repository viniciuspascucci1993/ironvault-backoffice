import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: string;
  sub: string;
  userId: string;
}

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/forgot-password"];

  // Se não tem token e está tentando acessar rota protegida
  if (!accessToken && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se tem token e está tentando acessar o login
  if (accessToken && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protege rota de usuários — só ADMIN
  if (accessToken && pathname.startsWith("/users")) {
    try {
      const payload = jwtDecode<JwtPayload>(accessToken);
      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (accessToken && pathname.startsWith("/login-logs")) {
    try {
      const payload = jwtDecode<JwtPayload>(accessToken);
      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
