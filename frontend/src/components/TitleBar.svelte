<script>
  import Close from "./window-actions/Close.svelte";
  import Maximize from "./window-actions/Maximize.svelte";
  import Minimize from "./window-actions/Minimize.svelte";

</script>
<section id="title-bar" class="bg-orange-500 h-6 w-full flex flex-row-reverse" style="--wails-draggable:drag">
  <Close/>
  <!-- <Maximize/> -->
  <Minimize/>
</section>
