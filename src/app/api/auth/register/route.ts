import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

function generateTemporaryPassword(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const temporaryPassword = generateTemporaryPassword();

    // Sistema cadastra mercador com senha tempararia
    await axios.post(
      `${process.env.BFF_URL}/api/auth/register`,
      { email: body.email, password: temporaryPassword, role: body.role },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    // Sistema dispara para mercador criar senha nova
    await axios.post(`${process.env.BFF_URL}/api/auth/forgot-password`, {
      email: body.email,
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso" },
      { status: 201 },
    );
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown; status?: number } };
    return NextResponse.json(
      error.response?.data || { message: "Internal server error" },
      { status: error.response?.status || 500 },
    );
  }
}
