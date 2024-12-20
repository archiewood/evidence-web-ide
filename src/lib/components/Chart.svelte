<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as echarts from 'echarts';
  import { createChartOptions } from '$lib/utils/charts/options';
  
  export let type: 'bar' | 'line' | 'pie' = 'bar';
  export let data: any[][] = [];
  export let columns: string[] = [];
  
  let container: HTMLDivElement;
  let chart: echarts.ECharts;

  $: if (chart && data) {
    updateChart();
  }

  onMount(() => {
    chart = echarts.init(container);
    createChart();
    
    const resizeObserver = new ResizeObserver(() => {
      chart?.resize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  });

  onDestroy(() => {
    if (chart) {
      chart.dispose();
    }
  });

  function createChart() {
    if (!chart) return;
    const options = createChartOptions({ columns, rows: data }, type);
    chart.setOption(options);
  }

  function updateChart() {
    if (!chart) return;
    const options = createChartOptions({ columns, rows: data }, type);
    chart.setOption(options);
  }
</script>

<div class="w-full h-48" bind:this={container}></div>

<style>
  div {
    margin: 0 -3.2rem;
    width: calc(100% + 3rem);
  }
</style>