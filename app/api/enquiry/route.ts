import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { success: false, message: 'Name, email, phone and service are required.' },
        { status: 400 }
      )
    }

    await prisma.enquiry.create({
      data: { name, email, phone, service, message: message ?? null },
    })

    return NextResponse.json(
      { success: true, message: 'Enquiry submitted successfully.' },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry.' },
      { status: 500 }
    )
  }
}
