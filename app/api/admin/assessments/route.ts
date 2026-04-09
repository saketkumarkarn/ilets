import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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
    const { id, status } = await request.json()
    const updated = await prisma.assessment.update({
      where: { id: Number(id) },
      data: { status },
    })
    return NextResponse.json({ success: true, assessment: updated })
  } catch {
    return NextResponse.json({ success: false, message: 'Update failed.' }, { status: 500 })
  }
}
