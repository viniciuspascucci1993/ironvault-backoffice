import axios from "axios";
import { cookies } from "next/headers";

export async function getServerApi() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  return axios.create({
    baseURL: process.env.BFF_URL,
    timeout: 10000,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })
}