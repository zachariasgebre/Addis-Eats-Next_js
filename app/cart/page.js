"use client"
import dynamic from 'next/dynamic'
import CartClient from '../../components/CartClient'

export default function CartPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <CartClient />
    </div>
  )
}
