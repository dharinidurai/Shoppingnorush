import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('shoop')
    const orders = await db.collection('orders').find().toArray()
    return NextResponse.json(orders)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const client = await clientPromise
    const db = client.db('shoop')
    const res = await db.collection('orders').insertOne(data)
    return NextResponse.json({ insertedId: res.insertedId.toString() })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
