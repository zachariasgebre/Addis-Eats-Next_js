import { dishes } from '../../lib/data/dishes'
import DishCard from '../../components/DishCard'
import CategoryBar from '../../components/CategoryBar'

export const revalidate = 3600

export default function MenuPage({ searchParams }) {
  const category = searchParams?.category || 'all'
  const categories = Array.from(new Set(dishes.map((d) => d.category)))
  const list = category === 'all' ? dishes : dishes.filter((d) => d.category === category)

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <aside className="md:col-span-1">
        <CategoryBar categories={categories} selected={category} />
      </aside>
      <section className="md:col-span-3">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {list.map((d) => (
            <DishCard key={d.id} dish={d} />
          ))}
        </div>
      </section>
    </div>
  )
}
