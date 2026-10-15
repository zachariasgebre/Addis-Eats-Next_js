import { NextResponse } from 'next/server'
import { getMenuPage } from '../../../lib/menu'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'all'
  const page = searchParams.get('page') || '1'

  return NextResponse.json(getMenuPage({ query, category, page }))
}
