import { getDishById } from '../lib/data/dishes'

export default function DishDetails({ id }) {
  const dish = getDishById(id)
  if (!dish) return null
  return (
    <div className="p-4 bg-white rounded">
      <h2 className="text-xl font-semibold">{dish.name}</h2>
      <p className="text-slate-600">{dish.description}</p>
      <div className="mt-2 font-medium">{dish.price} ETB</div>
    </div>
  )
}
