import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

type Cached = {
  client: MongoClient | null
  clientPromise: Promise<MongoClient> | null
}

declare global {
  // eslint-disable-next-line no-var
  var _mongo: Cached | undefined
}

const cached: Cached = (global as any)._mongo || { client: null, clientPromise: null }

if (!cached.clientPromise) {
  if (!uri) {
    // If no URI, we return a promise that rejects when awaited.
    // This prevents module evaluation from throwing at build time.
    cached.clientPromise = Promise.reject(new Error('Please define MONGODB_URI in your environment variables'))
  } else {
    const client = new MongoClient(uri)
    cached.client = client
    cached.clientPromise = client.connect()
  }
  ;(global as any)._mongo = cached
}

export default cached.clientPromise as Promise<MongoClient>
