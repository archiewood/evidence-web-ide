<script lang="ts">
  export let columns: string[] = [];
  export let rows: any[] = [];
</script>

<table class="min-w-full border-collapse">
  <thead>
    <tr>
      {#each columns as column}
        <th class="py-0 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
          {column}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each rows as row}
      <tr class="border-b border-gray-200">
        {#each row as cell}
          <td class="py-0 px-4 text-sm text-gray-600">
            {cell}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>