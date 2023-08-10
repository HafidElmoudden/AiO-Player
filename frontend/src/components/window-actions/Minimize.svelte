<script>
    import * as runtime from '../../../wailsjs/runtime/runtime.js';


</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="h-full w-7 hover:bg-orange-600 flex justify-center items-center" on:click|preventDefault={runtime.WindowMinimise}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color="white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      
</div>