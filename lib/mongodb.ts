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
    // If no URI, we return a promise that will only throw if awaited.
    // This prevents the build process from logging evaluation errors.
    cached.clientPromise = (async () => {
      // During build, we might not have the URI, so we just return null or throw later.
      // If this is awaited at runtime, it will throw.
      if (!uri) {
        throw new Error('Please define MONGODB_URI in your environment variables')
      }
      return new MongoClient(uri).connect()
    })()
  } else {
    const client = new MongoClient(uri)
    cached.client = client
    cached.clientPromise = client.connect()
  }
  ;(global as any)._mongo = cached
}

export default cached.clientPromise as Promise<MongoClient>
