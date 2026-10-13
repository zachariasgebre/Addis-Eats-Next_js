"use client"
import { useEffect } from 'react'

export default function MenuError({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="p-6 bg-red-50 text-red-800 rounded">
      <h3 className="font-semibold">Something went wrong loading the menu.</h3>
      <button className="mt-3 underline" onClick={() => reset()}>Try again</button>
    </div>
  )
}
