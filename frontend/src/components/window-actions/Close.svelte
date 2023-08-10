<script>
    import * as runtime from '../../../wailsjs/runtime/runtime.js';


</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="h-full w-7 hover:bg-orange-600 flex justify-center items-center" on:click={runtime.Quit}>
    <svg class="w-6 h-6" fill="none" color="white" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
</div>