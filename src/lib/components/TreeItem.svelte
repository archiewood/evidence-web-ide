<script lang="ts">
  import type { TableInfo } from '$lib/types/database';
  import { createEventDispatcher } from 'svelte';
  
  export let item: TableInfo;
  export let level = 0;
  
  let expanded = false;
  const dispatch = createEventDispatcher();
  
  function toggle() {
    expanded = !expanded;
  }

  $: ariaLabel = item.columns?.length 
    ? `${expanded ? 'Collapse' : 'Expand'} ${item.name} table`
    : `${item.name} column`;
</script>

<div class="flex flex-col font-mono">
  <button 
    class="flex items-center px-4 py-1 hover:bg-[#2a2d2e] w-full text-left"
    style="padding-left: {level * 1.5 + 1}rem"
    on:click={toggle}
    aria-expanded={item.columns?.length ? expanded : undefined}
    aria-label={ariaLabel}
  >
    <span class="w-4 h-4 flex items-center justify-center mr-2" aria-hidden="true">
      {#if item.columns?.length}
        <svg 
          class="w-3 h-3 transform transition-transform"
          class:rotate-90={expanded}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      {/if}
    </span>
    <svg 
      class="w-4 h-4 mr-2 text-[#c5c5c5]" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="M3 3h18v18H3z"/>
      <path d="M21 12H3"/>
      <path d="M12 3v18"/>
    </svg>
    <span class="text-sm">{item.name}</span>
  </button>
  
  {#if expanded && item.columns}
    <div class="ml-4" role="group" aria-label={`${item.name} columns`}>
      {#each item.columns as column}
        <button 
          class="flex items-center px-4 py-1 hover:bg-[#2a2d2e] w-full text-left"
          style="padding-left: {(level + 1) * 1.5 + 1}rem"
          aria-label={`${column.name} column of type ${column.type}`}
        >
          <span class="w-4 h-4 mr-2" aria-hidden="true">
            <svg 
              class="w-4 h-4 text-[#c5c5c5]" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </span>
          <span class="text-sm">{column.name}</span>
          <span class="text-xs text-gray-500 ml-2">({column.type})</span>
        </button>
      {/each}
    </div>
  {/if}
</div>