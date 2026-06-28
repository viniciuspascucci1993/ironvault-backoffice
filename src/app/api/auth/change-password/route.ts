import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const accessToken = request.cookies.get('accessToken')?.value

    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await axios.post(
      `${process.env.BFF_URL}/api/auth/change-password`,
      body,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    return NextResponse.json({ message: 'Senha alterada com sucesso' }, { status: 200 })
  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown; status?: number } }
    return NextResponse.json(
      error.response?.data || { message: 'Internal server error' },
      { status: error.response?.status || 500 }
    )
  }
}