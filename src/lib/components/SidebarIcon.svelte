<script lang="ts">
  export let active = false;
  export let title: string;
</script>

<div class="relative group">
  <button 
    class="p-2 rounded hover:bg-[#404040] transition-colors"
    class:bg-[#404040]={active}
    on:click
  >
    <div class:text-white={active} class:text-[#858585]={!active}>
      <slot></slot>
    </div>
  </button>
  
  <!-- Tooltip -->
  <div class="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#252526] text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
    {title}
  </div>
</div>