<script lang="ts">
  import TreeView from './TreeView.svelte';
  import { tables } from '$lib/stores/database';
</script>

<div class="w-1/2 border-r border-[#252526] flex flex-col min-h-0">
  <div class="h-9 bg-[#252526] flex items-center px-4 text-[#969696] text-sm border-b border-[#3c3c3c]">
    <span>Data Sources</span>
  </div>
  <div class="flex-1 min-h-0 bg-[#1e1e1e] text-[#d4d4d4] overflow-y-auto">
    <TreeView items={$tables} />
  </div>
</div>