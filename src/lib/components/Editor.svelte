<script lang="ts">
  import { onMount } from 'svelte';
  import Prism from 'prismjs';
  import 'prismjs/components/prism-markdown';
  
  export let code = '';
  let textarea: HTMLTextAreaElement;
  let highlighted: HTMLPreElement;
  
  $: if (highlighted) {
    highlighted.innerHTML = Prism.highlight(code, Prism.languages.markdown, 'markdown');
  }

  onMount(() => {
    // Sync scroll between textarea and highlighted code
    textarea.addEventListener('scroll', () => {
      highlighted.scrollTop = textarea.scrollTop;
      highlighted.scrollLeft = textarea.scrollLeft;
    });
  });
</script>

<div class="h-[calc(100vh-8rem)] w-full bg-[#1e1e1e] text-[#d4d4d4] font-mono relative">
  <pre
    bind:this={highlighted}
    class="absolute top-0 left-0 w-full h-full m-0 bg-transparent pointer-events-none p-4 overflow-auto whitespace-pre-wrap break-words"
    aria-hidden="true"><code class="language-markdown"></code></pre>
  
  <textarea
    bind:this={textarea}
    bind:value={code}
    class="absolute top-0 left-0 w-full h-full bg-transparent resize-none focus:outline-none leading-relaxed p-4 text-transparent caret-white whitespace-pre-wrap"
    spellcheck="false"
    placeholder="Type your markdown here..."
  ></textarea>
</div>

<style>
  textarea, pre {
    font-size: 0.875rem;
    line-height: 1.5;
    tab-size: 2;
    word-wrap: break-word;
  }
</style>