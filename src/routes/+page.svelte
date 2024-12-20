<script lang="ts">
  import Editor from '$lib/components/Editor.svelte';
  import Preview from '$lib/components/Preview.svelte';
  import SidebarIcon from '$lib/components/SidebarIcon.svelte';
  import DataSourcesExplorer from '$lib/components/DataSourcesExplorer.svelte';
  import { editorContent } from '$lib/stores/editor';
  import { isEditorVisible, activeView, currentView } from '$lib/stores/layout';
  import { isDeployed, deployUrl } from '$lib/stores/deploy';
  import { launchConfetti } from '$lib/utils/confetti';

  function toggleView() {
    $activeView = $activeView === 'editor' ? 'preview' : 'editor';
  }

  function handleDeploy() {
    launchConfetti();
    $isEditorVisible = false;
    $isDeployed = true;
  }

  function handleFiles() {
    $currentView = 'files';
    $isEditorVisible = !$isEditorVisible;
    $isDeployed = false;
  }

  function handleDataSources() {
    $currentView = 'data';
    $isEditorVisible = true;
  }
</script>

<div class="h-screen flex flex-col bg-[#1e1e1e]">
  <!-- VS Code-like title bar -->
  <div class="h-8 bg-[#323233] flex items-center px-4 text-gray-400 text-sm">
    <span class="hidden md:inline">Evidence IDE</span>
    <div class="md:hidden flex items-center space-x-2">
      <button 
        class="px-2 py-1 rounded text-sm"
        class:bg-[#404040]={$activeView === 'editor'}
        on:click={() => $activeView = 'editor'}
      >
        Editor
      </button>
      <button 
        class="px-2 py-1 rounded text-sm"
        class:bg-[#404040]={$activeView === 'preview'}
        on:click={() => $activeView = 'preview'}
      >
        Preview
      </button>
    </div>
  </div>
  
  <main class="flex-1 flex min-h-0">
    <!-- Activity Bar -->
    <div class="hidden md:flex w-12 bg-[#333333] flex-col items-center py-2 space-y-4">
      <SidebarIcon 
        active={$isEditorVisible && $currentView === 'files'} 
        title="Files" 
        on:click={handleFiles}
      >
        <svg 
          class="w-5 h-5" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      </SidebarIcon>

      <SidebarIcon 
        active={$currentView === 'data'} 
        title="Data Sources"
        on:click={handleDataSources}
      >
        <svg 
          class="w-5 h-5" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      </SidebarIcon>

      <SidebarIcon title="Deploy" on:click={handleDeploy}>
        <svg 
          class="w-5 h-5" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
        </svg>
      </SidebarIcon>
    </div>

    <!-- Editor and Preview -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Mobile View -->
      <div class="md:hidden w-full flex flex-col min-h-0" class:hidden={$activeView !== 'editor'}>
        <div class="h-9 bg-[#252526] flex items-center px-4 text-[#969696] text-sm border-b border-[#3c3c3c]">
          <span>index.md</span>
        </div>
        <div class="flex-1 min-h-0">
          {#if $currentView === 'data'}
            <DataSourcesExplorer />
          {:else}
            <Editor bind:code={$editorContent} />
          {/if}
        </div>
      </div>
      <div class="md:hidden w-full flex flex-col min-h-0" class:hidden={$activeView !== 'preview'}>
        <div class="h-9 bg-[#252526] flex items-center px-4 text-[#969696] text-sm border-b border-[#3c3c3c]">
          <span>{$isDeployed ? $deployUrl : 'Preview'}</span>
        </div>
        <div class="flex-1 min-h-0">
          <Preview html={$editorContent} />
        </div>
      </div>

      <!-- Desktop View -->
      <div class="hidden md:flex flex-1 min-h-0">
        {#if $isEditorVisible}
          {#if $currentView === 'data'}
            <DataSourcesExplorer />
          {:else}
            <div class="w-1/2 border-r border-[#252526] flex flex-col min-h-0">
              <div class="h-9 bg-[#252526] flex items-center px-4 text-[#969696] text-sm border-b border-[#3c3c3c]">
                <span>index.md</span>
              </div>
              <div class="flex-1 min-h-0">
                <Editor bind:code={$editorContent} />
              </div>
            </div>
          {/if}
        {/if}
        <div 
          class="flex-1 flex flex-col min-h-0"
          style="width: {$isEditorVisible ? '50%' : '100%'}"
        >
          <div class="h-9 bg-[#252526] flex items-center px-4 text-[#969696] text-sm border-b border-[#3c3c3c]">
            <span>{$isDeployed ? $deployUrl : 'Preview'}</span>
          </div>
          <div class="flex-1 min-h-0">
            <Preview html={$editorContent} />
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Status Bar -->
  <div class="h-6 bg-[#007acc] flex items-center px-2 text-white text-xs">
    <span class="mr-4">Markdown</span>
    <span>UTF-8</span>
  </div>
</div>