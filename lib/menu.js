import { dishes } from './data/dishes'

export const MENU_PAGE_SIZE = 4

export function getMenuPage({ query = '', category = 'all', page = 1 } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = category === 'all' || dish.category === category
    const searchableText = `${dish.name} ${dish.description} ${dish.category}`.toLocaleLowerCase()
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })

  const totalPages = Math.max(1, Math.ceil(filteredDishes.length / MENU_PAGE_SIZE))
  const currentPage = Math.min(Math.max(Number.parseInt(page, 10) || 1, 1), totalPages)
  const start = (currentPage - 1) * MENU_PAGE_SIZE

  return {
    dishes: filteredDishes.slice(start, start + MENU_PAGE_SIZE),
    page: currentPage,
    pageSize: MENU_PAGE_SIZE,
    totalItems: filteredDishes.length,
    totalPages
  }
}
