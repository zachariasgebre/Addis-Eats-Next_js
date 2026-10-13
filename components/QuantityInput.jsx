"use client"
import { useState, useEffect } from 'react'

export default function QuantityInput({ value = 1, onChange }) {
  const [v, setV] = useState(value)
  useEffect(() => setV(value), [value])
  useEffect(() => onChange?.(v), [v])

  return (
    <div className="flex items-center">
      <button className="px-2" onClick={() => setV((c) => Math.max(1, c - 1))}>−</button>
      <input className="w-12 text-center border rounded" value={v} onChange={(e) => setV(Number(e.target.value) || 1)} />
      <button className="px-2" onClick={() => setV((c) => c + 1)}>+</button>
    </div>
  )
}
