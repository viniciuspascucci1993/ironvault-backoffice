import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BFF_URL,
  timeout: 10000,
  withCredentials: true // ← envia cookies automaticamente
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const err = error as { response?: { status?: number } }
    if (err.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api