<script lang="ts">
  import type { TableInfo } from '$lib/types/database';
  import TreeItem from './TreeItem.svelte';
  
  export let items: TableInfo[] = [];
</script>

<div class="py-2">
  {#each items as item}
    <TreeItem {item} />
  {/each}
</div>