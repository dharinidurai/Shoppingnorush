import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('Please define MONGODB_URI in a .env.local file')
}

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
  const client = new MongoClient(uri)
  cached.client = client
  cached.clientPromise = client.connect()
  ;(global as any)._mongo = cached
}

export default cached.clientPromise as Promise<MongoClient>
