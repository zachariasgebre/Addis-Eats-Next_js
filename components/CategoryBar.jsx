"use client"
import { useRouter } from 'next/navigation'

export default function CategoryBar({ categories = [], selected = 'all', query = '' }) {
  const router = useRouter()

  function select(cat) {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (cat && cat !== 'all') params.set('category', cat)
    const search = params.toString()
    router.push(search ? `/menu?${search}` : '/menu')
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm sticky top-6">
      <h4 className="font-semibold mb-2">Categories</h4>
      <ul className="space-y-2">
        <li>
          <button className={`w-full text-left ${selected==='all' ? 'font-bold' : ''}`} onClick={() => select('all')}>All</button>
        </li>
        {categories.map((c) => (
          <li key={c}>
            <button className={`w-full text-left ${selected===c ? 'font-bold' : ''}`} onClick={() => select(c)}>{c}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
