import { highlightCode } from '../highlighter';
import { executeQuery } from '$lib/services/database';
import { queryResults } from '$lib/stores/queries';
import { get } from 'svelte/store';

export async function renderSQLBlock(code: string, queryName: string) {
  try {
    const result = await executeQuery(queryName, code);
    const highlightedSQL = highlightCode(code, 'sql');
    
    // Store the result for later reference
    queryResults.update(results => ({
      ...results,
      [queryName]: result
    }));
    
    return `
      <div class="code-block">
        <pre class="language-sql"><code>${highlightedSQL}</code></pre>
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
                  ${row.map(cell => `
                    <td class="py-0.5 px-0 text-sm text-gray-600">
                      ${cell}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (error) {
    const highlightedSQL = highlightCode(code, 'sql');
    return `
      <div class="code-block">
        <pre class="language-sql"><code>${highlightedSQL}</code></pre>
        <div class="mt-2 p-2 bg-red-50 rounded">
          <div class="font-bold">Error executing query</div>
          <div class="text-sm">${error.message}</div>
        </div>
      </div>
    `;
  }
}