import type { Category } from '$lib/data/categories';
import { categories } from '$lib/data/categories';

export function generateCategoryTable() {
  return {
    columns: ['Category', 'Products', 'Revenue'],
    rows: categories.map(cat => [
      cat.name,
      cat.products.toString(),
      `$${cat.revenue.toLocaleString()}`
    ])
  };
}