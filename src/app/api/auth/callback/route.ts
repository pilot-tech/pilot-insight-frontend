// app/api/auth/callback/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");

  if (accessToken) {
    // Set cookies with the tokens
    (await cookies()).set({
      name: "kinde_token",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    if (refreshToken) {
      (await cookies()).set({
        name: "kinde_refresh_token",
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}
