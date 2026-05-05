'use client'
import React, { useState } from 'react'

export default function AddProductPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: parseFloat(price) }),
      })
      const data = await res.json()
      if (res.ok) {
        setMsg('Created ' + data.insertedId)
        setName('')
        setPrice('')
      } else {
        setMsg('Error: ' + JSON.stringify(data))
      }
    } catch (err) {
      setMsg('Error: ' + String(err))
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:{' '}
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Price:{' '}
            <input value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
      <p>{msg}</p>
    </main>
  )
}
