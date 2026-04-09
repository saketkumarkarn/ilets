import { prisma } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params
  const record = await prisma.siteContent.findUnique({ where: { section } })
  if (!record) {
    return Response.json({ content: null })
  }
  return Response.json({ content: JSON.parse(record.content) })
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params
  const body = await request.json()
  await prisma.siteContent.upsert({
    where: { section },
    create: { section, content: JSON.stringify(body) },
    update: { content: JSON.stringify(body) },
  })
  return Response.json({ ok: true })
}
