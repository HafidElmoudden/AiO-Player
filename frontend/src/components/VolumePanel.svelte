
<!-- VolumePanel.svelte -->
<div on:mouseenter={() => setShow(true)} on:mouseleave={() =>  {setShow(false); console.log("did we leave without leaving ?") }} class={show ? "w-6 h-[100px] px-3 py-8 absolute top-[-115px] rounded-md border-[#ec4c24] border-2 flex items-center justify-center" : "hidden"}>
    <input type="range" min="0" max="100" value={volume * 100} class="w-20 h-90 accent-[#ec4c24] transform -rotate-90" on:input={handleVolumeChange}>
</div>

<script>
  export let setShow;
  export let show;
  export let volume;
  export let handleVolumeChange;
</script>
