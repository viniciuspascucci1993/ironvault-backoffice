import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axios.post(
      `${process.env.BFF_URL}/api/auth/login`,
      body,
    );

    const { accessToken, refreshToken, email, role } = response.data;
    const res = NextResponse.json({ email, role }, { status: 200 });

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 horas
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
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
