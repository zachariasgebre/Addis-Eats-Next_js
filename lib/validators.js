import { z } from 'zod'

export const orderItemSchema = z.object({
  id: z.string(),
  quantity: z.number().int().positive()
})

export const orderSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(5),
  items: z.array(orderItemSchema).min(1),
  total: z.number().nonnegative()
})

export default orderSchema
