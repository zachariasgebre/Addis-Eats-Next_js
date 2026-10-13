import { dishes, getDishById } from '../../../lib/data/dishes'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return dishes.map((d) => ({ id: d.id }))
}

export default function DishPage({ params }) {
  const dish = getDishById(params.id)
  if (!dish) notFound()

  return (
    <article className="p-6 bg-white rounded shadow-sm">
      <h2 className="text-2xl font-bold">{dish.name}</h2>
      <p className="text-slate-600 mt-2">{dish.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-medium">{dish.price} ETB</span>
      </div>
    </article>
  )
}
