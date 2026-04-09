import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ posts: [] }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, excerpt, content, category, imageUrl } = body

    if (!title || !slug || !excerpt || !content || !category) {
      return NextResponse.json(
        { success: false, message: 'title, slug, excerpt, content and category are required.' },
        { status: 400 }
      )
    }

    const post = await prisma.blogPost.create({
      data: { title, slug, excerpt, content, category, imageUrl: imageUrl ?? null, published: false },
    })

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create post.' }, { status: 500 })
  }
}
