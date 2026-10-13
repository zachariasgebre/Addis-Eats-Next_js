import { createOrder } from '../../lib/orders'
import { orderSchema } from '../../lib/validators'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
  async function submitOrder(formData) {
    'use server'
    const data = Object.fromEntries(formData)
    // server-side validation
    const parsed = orderSchema.safeParse(JSON.parse(data.payload))
    if (!parsed.success) {
      throw new Error('Validation failed')
    }
    const created = await createOrder(parsed.data)
    // after successful order, redirect to a simple thanks page (or home)
    redirect('/')
  }

  return (
    <div className="p-6 bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form action={submitOrder}>
        <div className="mb-3">
          <label className="block text-sm">Name</label>
          <input name="name" className="mt-1 p-2 border rounded w-full" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Email</label>
          <input name="email" type="email" className="mt-1 p-2 border rounded w-full" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Address</label>
          <textarea name="address" className="mt-1 p-2 border rounded w-full" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Order Payload (JSON)</label>
          <textarea name="payload" placeholder='{"items": [{"id":"1","quantity":2}], "total": 200}' className="mt-1 p-2 border rounded w-full" />
        </div>
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded">Place Order</button>
      </form>
    </div>
  )
}
