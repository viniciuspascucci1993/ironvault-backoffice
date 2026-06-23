import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 },
      );
    }

    const response = await axios.post(
      `${process.env.BFF_URL}/api/auth/refresh`,
      { refreshToken },
    );

    const { accessToken } = response.data;

    const res = NextResponse.json(
      { message: "Token refreshed" },
      { status: 200 },
    );

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown; status?: number } };
    return NextResponse.json(
      error.response?.data || { message: "Internal server error" },
      { status: error.response?.status || 500 },
    );
  }
}
