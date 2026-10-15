import { NextResponse } from 'next/server'
import { getOrderById } from '../../../../lib/orders'

export const dynamic = 'force-dynamic'

export async function GET(_request, { params }) {
  const order = await getOrderById(params.id)

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json(order)
}
