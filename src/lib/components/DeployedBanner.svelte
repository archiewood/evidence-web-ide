<script lang="ts">
  import { deployUrl } from '$lib/stores/deploy';
</script>

<div class="flex flex-col items-center justify-center h-full bg-white text-center px-4">
  <h1 class="text-2xl font-bold mb-4">🚀 Deployment Successful!</h1>
  <p class="text-gray-600 mb-6">Your Evidence project is now live at:</p>
  <a 
    href={$deployUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    class="text-blue-600 hover:text-blue-800 text-lg font-medium"
  >
    {$deployUrl}
  </a>
</div>