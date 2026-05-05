import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const client = await clientPromise
    if (!client) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }
    const db = client.db('shoop')
    const products = await db.collection('products').find().toArray()
    return NextResponse.json(products)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const client = await clientPromise
    if (!client) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }
    const db = client.db('shoop')
    const res = await db.collection('products').insertOne(data)
    return NextResponse.json({ insertedId: res.insertedId.toString() })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
