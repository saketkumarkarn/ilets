import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Accept both `name` and `fullName` (different forms use different field names)
    const { type, name, fullName, email, phone, country, education, experience, courseLevel, destination, loanAmount, ...rest } = body
    const resolvedName = name || fullName

    if (!type || !resolvedName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Name, email and phone are required.' },
        { status: 400 }
      )
    }

    await prisma.assessment.create({
      data: {
        type,
        name: resolvedName,
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
  } catch (err) {
    console.error('[assessment API error]', err)
    return NextResponse.json(
      { success: false, message: 'Server error. Please try again shortly.' },
      { status: 500 }
    )
  }
}
