import Link from 'next/link'
import { dishes } from '../lib/data/dishes'

export default function HomePage() {
  const specials = dishes.slice(0, 3)
  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Today's Specials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {specials.map((d) => (
            <article key={d.id} className="p-4 bg-white rounded shadow-sm">
              <h3 className="font-semibold">{d.name}</h3>
              <p className="text-sm text-slate-600">{d.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-medium">{d.price} ETB</span>
                <Link href={`/menu/${d.id}`} className="text-indigo-600">View</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Explore the Menu</h2>
        <p className="mt-2">Head to the <Link href="/menu" className="text-indigo-600">menu</Link> to browse dishes by category.</p>
      </section>
    </div>
  )
}
