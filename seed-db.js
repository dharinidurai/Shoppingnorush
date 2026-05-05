const { MongoClient } = require('mongodb')
const fs = require('fs')
const path = require('path')

function readEnvUri() {
  const envPath = path.join(__dirname, '.env.local')
  if (!fs.existsSync(envPath)) return null
  const content = fs.readFileSync(envPath, 'utf8')
  const m = content.match(/^MONGODB_URI=(.*)$/m)
  return m ? m[1].trim() : null
}

const uri = readEnvUri()
if (!uri) {
  console.error('MONGODB_URI not found in .env.local')
  process.exit(1)
}

async function run() {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db('shoop')

    const sampleProducts = [
      { name: 'Sample Coffee', price: 9.99, sku: 'COF-001', createdAt: new Date() },
      { name: 'Sample Tea', price: 4.5, sku: 'TEA-001', createdAt: new Date() }
    ]

    await db.collection('products').deleteMany({})
    const r = await db.collection('products').insertMany(sampleProducts)
    console.log('Inserted products:', r.insertedCount)
  } catch (err) {
    console.error('Seeding error:', err)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

run()
