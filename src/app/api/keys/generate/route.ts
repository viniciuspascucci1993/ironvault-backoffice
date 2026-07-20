import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value

    if (!accessToken) {
      return NextResponse.json({ message: 'UnAuthorized' }, { status: 401 })
    }

    const response = await axios.post(
      `${process.env.BFF_URL}/api/keys/generate`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    return NextResponse.json(response.data, { status: 200 })

  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown; status?: number } }
    return NextResponse.json(
      error.response?.data || { message: 'Internal Server Error' },
      { status: error.response?.status || 500 }
    )
  }
}