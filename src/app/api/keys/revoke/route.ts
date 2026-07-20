import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value

    if (!accessToken) {
      return NextResponse.json({ message: 'UnAuthorized' }, { status: 401 })
    }

    await axios.delete(
      `${process.env.BFF_URL}/api/keys/revoke`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    return NextResponse.json({ message: 'API Key revogada com sucesso'}, { status: 200 })

  } catch (err: unknown) {
    const error = err as { response?: { data?: unknown; status?: number } }
    return NextResponse.json(
      error.response?.data || { message: 'Internal Server Error' },
      { status: error.response?.status || 500 }
    )
  }
}