import { NextResponse } from 'next/server'
import { orderSchema } from '../../../lib/validators'
import { createOrder } from '../../../lib/orders'

export async function POST(request) {
  try {
    const body = await request.json()
    const parsed = orderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.format() }, { status: 400 })
    }
    const created = await createOrder(parsed.data)
    return NextResponse.json({ ok: true, order: created }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
