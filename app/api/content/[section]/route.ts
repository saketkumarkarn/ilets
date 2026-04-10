import { prisma } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NO_CACHE = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params
  const record = await prisma.siteContent.findUnique({ where: { section } })
  if (!record) {
    return Response.json({ content: null }, { headers: NO_CACHE })
  }
  return Response.json({ content: JSON.parse(record.content) }, { headers: NO_CACHE })
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
  return Response.json({ ok: true }, { headers: NO_CACHE })
}
