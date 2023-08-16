
<!-- VolumePanel.svelte -->
<div class="w-6 h-[100px] px-3 py-8 absolute top-[-115px] rounded-md border-[#ec4c24] border-2 hover:flex hover:items-center hover:justify-center peer-hover:items-center peer-hover:justify-center peer-hover:flex hidden">
    <input type="range" min="0" max="100" value={volume} class="w-20 h-90 accent-[#ec4c24] transform -rotate-90" on:input={handleVolumeChange}>
</div>

<script>
  import { Range } from 'flowbite-svelte';
  export let volume;
  export let handleVolumeChange;
</script>
