"use client"
import QuantityInput from './QuantityInput'

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <li className="flex items-center justify-between">
      <div>
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-slate-600">{item.price} ETB</div>
      </div>
      <div className="flex items-center gap-4">
        <QuantityInput value={item.quantity} onChange={(v) => onUpdate(item.id, v)} />
        <button className="text-red-600" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </li>
  )
}
