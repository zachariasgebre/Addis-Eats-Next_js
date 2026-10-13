import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Addis Eats',
  description: 'A Next.js App Router demo food ordering app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white shadow-sm mb-6">
          <div className="container py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Addis Eats</h1>
            <nav className="space-x-4">
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/checkout">Checkout</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
