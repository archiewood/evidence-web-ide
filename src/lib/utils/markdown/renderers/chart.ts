import { get } from 'svelte/store';
import { queryResults } from '$lib/stores/queries';

export function renderChart(queryName: string, type: string = 'bar'): string {
  const results = get(queryResults);
  const result = results[queryName];
  
  if (!result) {
    return `<div 
      class="chart-container" 
      data-query="${queryName}" 
      data-type="${type}"
      data-pending="true"
    >
    </div>`;
  }

  const data = JSON.stringify(result.rows);
  const columns = JSON.stringify(result.columns);
  
  return `<div 
    class="chart-container" 
    data-chart='{"type":"${type}","data":${data},"columns":${columns}}'
  ></div>`;
}