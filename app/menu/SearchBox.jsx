"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import DishCard from '../../components/DishCard'
import { fetcher } from '../../lib/fetcher'

function menuHref({ query, category, page }) {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const search = params.toString()
  return search ? `/menu?${search}` : '/menu'
}

export default function SearchBox({ initialResults, query = '', category = 'all', page = 1 }) {
  const router = useRouter()
  const [input, setInput] = useState(query)
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(input.trim()), 300)
    return () => clearTimeout(timeout)
  }, [input])

  useEffect(() => {
    if (debouncedQuery === query) return
    router.replace(menuHref({ query: debouncedQuery, category, page: 1 }), { scroll: false })
  }, [category, debouncedQuery, page, query, router])

  const searchPage = debouncedQuery && debouncedQuery !== query ? 1 : page
  const key = debouncedQuery
    ? `/api/menu?q=${encodeURIComponent(debouncedQuery)}&category=${encodeURIComponent(category)}&page=${searchPage}`
    : null
  const { data, isValidating } = useSWR(key, fetcher, {
    fallbackData: initialResults,
    keepPreviousData: true
  })
  const results = data || initialResults

  return (
    <section aria-labelledby="menu-heading">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="menu-heading" className="text-2xl font-bold text-slate-950">Menu</h2>
          <p className="mt-1 text-sm text-slate-500">
            {results.totalItems} {results.totalItems === 1 ? 'dish' : 'dishes'}
            {isValidating && <span className="ml-2 text-emerald-700">Updating…</span>}
          </p>
        </div>
        <label className="w-full sm:max-w-sm">
          <span className="sr-only">Search the menu</span>
          <input
            type="search"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Search dishes, ingredients…"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
      </div>

      {results.dishes.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold text-slate-800">No dishes found</p>
          <p className="mt-1 text-sm text-slate-500">Try another dish name or ingredient.</p>
        </div>
      )}

      {results.totalPages > 1 && (
        <nav className="mt-6 flex items-center justify-center gap-2" aria-label="Menu pages">
          {Array.from({ length: results.totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={menuHref({ query: debouncedQuery, category, page: pageNumber })}
              aria-current={results.page === pageNumber ? 'page' : undefined}
              className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold ${
                results.page === pageNumber
                  ? 'bg-emerald-700 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-600'
              }`}
            >
              {pageNumber}
            </Link>
          ))}
        </nav>
      )}
    </section>
  )
}
