import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="flex items-center gap-4">
      <Link href="/">Home</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/checkout">Checkout</Link>
    </nav>
  )
}
