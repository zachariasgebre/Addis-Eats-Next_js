import { notFound } from 'next/navigation'
import OrderStatus from '../../../components/OrderStatus'
import { getOrderById } from '../../../lib/orders'

export const dynamic = 'force-dynamic'

export default async function OrderPage({ params }) {
  const order = await getOrderById(params.id)

  if (!order) notFound()

  return <OrderStatus initialOrder={order} />
}
