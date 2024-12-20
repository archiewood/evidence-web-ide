export interface Category {
  id: number;
  name: string;
  products: number;
  revenue: number;
}

export const categories: Category[] = [
  { id: 1, name: 'Toys', products: 150, revenue: 45000 },
  { id: 2, name: 'Sporting Goods', products: 200, revenue: 75000 },
  { id: 3, name: 'Equipment', products: 120, revenue: 95000 },
  { id: 4, name: 'Gadgets', products: 180, revenue: 85000 }
];