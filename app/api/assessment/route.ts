import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, name, email, phone, country, education, experience, courseLevel, destination, loanAmount, ...rest } = body

    if (!type || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Type, name, email and phone are required.' },
        { status: 400 }
      )
    }

    await prisma.assessment.create({
      data: {
        type,
        name,
        email,
        phone,
        country: country ?? null,
        education: education ?? null,
        experience: experience ?? null,
        courseLevel: courseLevel ?? null,
        destination: destination ?? null,
        loanAmount: loanAmount ?? null,
        data: JSON.stringify(rest),
      },
    })

    return NextResponse.json(
      { success: true, message: "Assessment submitted. We'll contact you within 24 hours." },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to submit assessment.' },
      { status: 500 }
    )
  }
}
