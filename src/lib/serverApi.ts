import axios from "axios";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: string;
  sub: string;
  userId: string;
  exp?: number;
}

export async function getServerApi() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  return axios.create({
    baseURL: process.env.BFF_URL,
    timeout: 10000,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}

export async function getTokenPayload(): Promise<JwtPayload | null> {
  const cookiesStore = await cookies()
  const token = cookiesStore.get("accessToken")?.value

  if (!token) return null
  try {
    return jwtDecode<JwtPayload>(token)
  } catch {
    return null
  }
}
