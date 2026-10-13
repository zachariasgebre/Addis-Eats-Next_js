import Link from 'next/link'

export default function DishCard({ dish }) {
  return (
    <article className="p-4 bg-white rounded shadow-sm">
      <h3 className="font-semibold">{dish.name}</h3>
      <p className="text-sm text-slate-600">{dish.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-medium">{dish.price} ETB</span>
        <Link href={`/menu/${dish.id}`} className="text-indigo-600">View</Link>
      </div>
    </article>
  )
}
