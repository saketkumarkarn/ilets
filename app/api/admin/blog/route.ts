import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ posts: [] }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, published, title, excerpt, content, category } = await request.json()
    const updated = await prisma.blogPost.update({
      where: { id: Number(id) },
      data: { ...(published !== undefined && { published }), ...(title && { title }), ...(excerpt && { excerpt }), ...(content && { content }), ...(category && { category }) },
    })
    return NextResponse.json({ success: true, post: updated })
  } catch {
    return NextResponse.json({ success: false, message: 'Update failed.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.blogPost.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: 'Delete failed.' }, { status: 500 })
  }
}
