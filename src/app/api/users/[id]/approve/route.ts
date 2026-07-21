import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PATCH(
  request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const accessToken = request.cookies.get('accessToken')?.value

    if(!accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await axios.patch(
      `${process.env.BFF_URL}/api/users/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    return NextResponse.json({ message: 'Usuário aprovado com sucessp' }, { status: 200 })

  } catch(err: unknown) {
    const error = err as { response?: { data?: unknown; status?: number } }
    return NextResponse.json(
      error.response?.data || { message: 'Internal Server Error' },
      { status: error.response?.status || 500 },
    )
  }
}