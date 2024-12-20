<script lang="ts">
  import { onMount } from 'svelte';
  import { parseMarkdown } from '$lib/utils/markdown';
  import Chart from './Chart.svelte';
  import { queryResults } from '$lib/stores/queries';
  
  export let html = '';
  let parsedHtml = '';
  let container: HTMLDivElement;
  let chartInstances: Map<HTMLElement, Chart> = new Map();
  
  $: {
    parseMarkdown(html).then(result => {
      parsedHtml = result;
      setTimeout(initCharts, 0);
    });
  }

  $: if ($queryResults) {
    setTimeout(initCharts, 0);
  }

  function cleanupCharts() {
    chartInstances.forEach(instance => {
      instance.$destroy();
    });
    chartInstances.clear();
  }

  function initCharts() {
    if (!container) return;
    
    // Cleanup existing charts
    cleanupCharts();
    
    const chartContainers = container.querySelectorAll('.chart-container');
    chartContainers.forEach(el => {
      const chartEl = el as HTMLElement;
      
      // Handle pending charts
      if (chartEl.dataset.pending) {
        const queryName = chartEl.dataset.query;
        const type = chartEl.dataset.type;
        const result = $queryResults[queryName || ''];
        
        if (result) {
          // Clear pending state
          delete chartEl.dataset.pending;
          
          // Update chart data
          chartEl.dataset.chart = JSON.stringify({
            type,
            data: result.rows,
            columns: result.columns
          });
        } else {
          return; // Skip if data not yet available
        }
      }
      
      // Create or update chart
      const chartData = JSON.parse(chartEl.dataset.chart || '{}');
      const chartInstance = new Chart({
        target: chartEl,
        props: {
          type: chartData.type,
          data: chartData.data,
          columns: chartData.columns
        }
      });
      
      chartInstances.set(chartEl, chartInstance);
    });
  }

  onMount(() => {
    return () => {
      cleanupCharts();
    };
  });
</script>

<div class="preview-container" bind:this={container}>
  <div class="prose prose-slate max-w-4xl mx-auto">
    {@html parsedHtml}
  </div>
</div>