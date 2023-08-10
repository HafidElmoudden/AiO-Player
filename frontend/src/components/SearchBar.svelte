<script lang="ts">
  // @ts-nocheck
  import { Button, ButtonGroup, Input, Label } from "flowbite-svelte";
  import { SearchSolid } from "flowbite-svelte-icons";
  import { getPlaylistData } from "../store/Youtube.ts";

  let value = "https://www.youtube.com/playlist?list=PL2AuEnYKm_gavKIJjhHfvr_EL7uSNpiKV";
</script>

<div class="w-full flex flex-row h-fit items-start justify-center gap-3">
  <ButtonGroup class="w-full">
    <Input
      id="input-addon"
      placeholder="Playlist link..."
      {value}
      on:change={(e) => (value = e.target.value)}
    />
    <Button color="primary" on:click={() => getPlaylistData(value)}
      ><SearchSolid style="outline: none;" /></Button
    >
  </ButtonGroup>
</div>
