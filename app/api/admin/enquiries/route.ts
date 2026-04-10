import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ enquiries })
  } catch {
    return NextResponse.json({ enquiries: [] }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status, remarks } = await request.json()
    const data: Record<string, string> = {}
    if (status !== undefined) data.status = status
    if (remarks !== undefined) data.remarks = remarks
    const updated = await prisma.enquiry.update({
      where: { id: Number(id) },
      data,
    })
    return NextResponse.json({ success: true, enquiry: updated })
  } catch {
    return NextResponse.json({ success: false, message: 'Update failed.' }, { status: 500 })
  }
}
