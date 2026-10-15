import { dishes } from '../../lib/data/dishes'
import { getMenuPage } from '../../lib/menu'
import CategoryBar from '../../components/CategoryBar'
import SearchBox from './SearchBox'

export const dynamic = 'force-dynamic'

export default function MenuPage({ searchParams = {} }) {
  const category = searchParams.category || 'all'
  const query = searchParams.q || ''
  const page = Number.parseInt(searchParams.page || '1', 10) || 1
  const categories = Array.from(new Set(dishes.map((dish) => dish.category)))
  const initialResults = getMenuPage({ query, category, page })

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <aside className="md:col-span-1">
        <CategoryBar categories={categories} selected={category} query={query} />
      </aside>
      <div className="md:col-span-3">
        <SearchBox
          initialResults={initialResults}
          query={query}
          category={category}
          page={initialResults.page}
        />
      </div>
    </div>
  )
}
