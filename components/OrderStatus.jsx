"use client"

import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'

const statusSteps = [
  { id: 'received', label: 'Order received', description: 'The restaurant has your order.' },
  { id: 'preparing', label: 'Preparing', description: 'Your meal is being prepared.' },
  { id: 'ready', label: 'Ready for pickup', description: 'Your order is ready.' },
  { id: 'delivered', label: 'Completed', description: 'Enjoy your meal!' }
]

export default function OrderStatus({ initialOrder }) {
  const { data: order, error, isValidating } = useSWR(
    `/api/orders/${initialOrder.id}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
      revalidateOnFocus: true
    }
  )

  const currentStep = Math.max(0, statusSteps.findIndex((step) => step.id === order.status))
  const updatedAt = order.updatedAt || order.createdAt

  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Addis Eats</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Order status</h1>
          <p className="mt-2 text-sm text-slate-500">Order #{order.id}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold capitalize text-emerald-800">
          {order.status}
        </span>
      </div>

      <ol className="mt-8 space-y-5" aria-label="Order progress">
        {statusSteps.map((step, index) => {
          const complete = index <= currentStep
          return (
            <li key={step.id} className="flex gap-4">
              <span
                className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  complete ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-400'
                }`}
                aria-hidden="true"
              >
                {complete ? '✓' : index + 1}
              </span>
              <div>
                <p className={`font-semibold ${complete ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                <p className="mt-1 text-sm text-slate-500">{step.description}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 border-t border-slate-100 pt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Order total</span>
          <span className="font-bold text-slate-900">{order.total} ETB</span>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          {error ? 'Could not refresh just now. Showing the latest saved status.' :
            isValidating ? 'Checking for updates…' : 'Updates automatically every 5 seconds.'}
        </p>
        {updatedAt && (
          <p className="mt-1 text-xs text-slate-400">
            Last updated {new Date(updatedAt).toISOString()}
          </p>
        )}
      </div>
    </section>
  )
}
