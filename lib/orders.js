import fs from 'fs/promises'
import path from 'path'
import { orderSchema } from './validators'

const DATA_PATH = path.join(process.cwd(), 'data', 'orders.json')

async function ensureDataFile() {
  try {
    await fs.access(DATA_PATH)
  } catch (err) {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
    await fs.writeFile(DATA_PATH, JSON.stringify([]))
  }
}

export async function createOrder(order) {
  const parsed = orderSchema.parse(order)
  await ensureDataFile()
  const raw = await fs.readFile(DATA_PATH, 'utf-8')
  const arr = JSON.parse(raw || '[]')
  const id = String(Date.now())
  const record = { id, ...parsed, createdAt: new Date().toISOString() }
  arr.push(record)
  await fs.writeFile(DATA_PATH, JSON.stringify(arr, null, 2))
  return record
}

export default createOrder
