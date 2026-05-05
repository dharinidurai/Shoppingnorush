import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('shoop')
    const collections = await db.listCollections().toArray()
    return NextResponse.json({ ok: 1, collections })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
