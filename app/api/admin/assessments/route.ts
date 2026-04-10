import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const assessments = await prisma.assessment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ assessments })
  } catch {
    return NextResponse.json({ assessments: [] }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status, remarks } = await request.json()
    const data: Record<string, string> = {}
    if (status !== undefined) data.status = status
    if (remarks !== undefined) data.remarks = remarks
    const updated = await prisma.assessment.update({
      where: { id: Number(id) },
      data,
    })
    return NextResponse.json({ success: true, assessment: updated })
  } catch {
    return NextResponse.json({ success: false, message: 'Update failed.' }, { status: 500 })
  }
}
