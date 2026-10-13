export const dishes = [
  {
    id: '1',
    name: 'Shiro w/ Injera',
    description: 'Traditional Ethiopian chickpea stew with injera.',
    category: 'Main',
    price: 120
  },
  {
    id: '2',
    name: 'Doro Wat',
    description: 'Spicy chicken stew served with injera.',
    category: 'Main',
    price: 180
  },
  {
    id: '3',
    name: 'Firfir',
    description: 'Shredded injera with spicy sauce.',
    category: 'Breakfast',
    price: 90
  },
  {
    id: '4',
    name: 'Coffee (Bunna)',
    description: 'Fresh Ethiopian coffee, small cup.',
    category: 'Drinks',
    price: 30
  },
  {
    id: '5',
    name: 'Kitfo',
    description: 'Spiced raw/minced beef, served warm.',
    category: 'Main',
    price: 220
  }
]

export function getDishById(id) {
  return dishes.find((d) => d.id === id) || null
}

export default dishes
