import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/** Extensionless PDF stream so download managers do not auto-intercept. */
export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'resume.pdf')

  try {
    const bytes = await readFile(filePath)
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
  }
}
