"use client"
import { useEffect, useState } from 'react'
import CartItem from './CartItem'

const STORAGE_KEY = 'addis-cart'

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

export default function CartClient() {
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(readCart())
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function update(id, qty) {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, quantity: qty } : it))
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const total = items.reduce((s, it) => s + (it.price || 0) * it.quantity, 0)

  if (items.length === 0) return <div className="p-4 bg-white rounded">Your cart is empty.</div>

  return (
    <div className="p-4 bg-white rounded">
      <ul className="space-y-3">
        {items.map((it) => (
          <CartItem key={it.id} item={it} onUpdate={update} onRemove={removeItem} />
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-semibold">Total: {total} ETB</div>
        <button className="bg-indigo-600 text-white py-2 px-4 rounded">Proceed to Checkout</button>
      </div>
    </div>
  )
}
