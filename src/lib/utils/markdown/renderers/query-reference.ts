import { get } from 'svelte/store';
import { queryResults } from '$lib/stores/queries';
import { formatNumber } from '../../format';

export function renderQueryReference(queryName: string): string {
  const results = get(queryResults);
  const result = results[queryName];
  
  if (!result) {
    return `<div class="p-2 bg-red-50 text-red-600 text-sm rounded">
      Query "${queryName}" not found
    </div>`;
  }
  
  return `
    <div class="mt-2">
      <table class="min-w-full border-collapse">
        <thead>
          <tr>
            ${result.columns.map(col => `
              <th class="py-0.5 px-0 text-left text-sm font-bold tracking-[0.5px] capitalize border-b border-gray-400">
                ${col}
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          ${result.rows.map(row => `
            <tr class="border-b border-gray-200">
              ${row.map((cell, i) => `
                <td class="py-0.5 px-0 text-sm text-gray-600">
                  ${typeof cell === 'number' && result.columns[i].toLowerCase().includes('revenue') 
                    ? formatNumber(cell)
                    : cell}
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}