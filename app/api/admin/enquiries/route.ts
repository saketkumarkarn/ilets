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
    const { id, status } = await request.json()
    const updated = await prisma.enquiry.update({
      where: { id: Number(id) },
      data: { status },
    })
    return NextResponse.json({ success: true, enquiry: updated })
  } catch {
    return NextResponse.json({ success: false, message: 'Update failed.' }, { status: 500 })
  }
}
