<script lang="ts">
  // @ts-nocheck
  import { Button, ButtonGroup, Input } from "flowbite-svelte";
  import {
    EyeSlashSolid,
    EyeSolid,
    SearchSolid,
    ShuffleSolid,
  } from "flowbite-svelte-icons";
  import { getPlaylistData, playlistData } from "../store/Youtube.ts";
  import { AudioPlayer } from "../services/Audio.js";
  import { get } from "svelte/store";
  export let handleShowList;
  export let eyeState;
  let value =
    "https://www.youtube.com/playlist?list=PL2AuEnYKm_gavKIJjhHfvr_EL7uSNpiKV";

  const shuffle = () => {
    if (!get(playlistData).Videos || get(playlistData).Videos.length == 0) {
      getPlaylistData(value).then(() => {
        AudioPlayer.shuffle();
      });
    } else {
      AudioPlayer.shuffle();
    }
  };
</script>

<div class="w-full flex flex-row h-fit items-start justify-center gap-3">
  <ButtonGroup class="w-full">
    <Input
      id="input-addon"
      placeholder="Playlist link..."
      {value}
      on:change={(e) => (value = e.target.value)}
    />
    <Button color="primary" on:click={() => getPlaylistData(value)}>
      <SearchSolid style="outline: none;" />
    </Button>
    <Button color="primary" on:click={() => getPlaylistData(value)}>
      {#if eyeState == true}
        <EyeSolid style="outline: none;" on:click={() => handleShowList(false)}/>
      {/if}
      {#if eyeState == false}
        <EyeSlashSolid style="outline: none;" on:click={() => handleShowList(true)}/>
      {/if}
    </Button>
    <Button color="primary" on:click={shuffle}>
      <ShuffleSolid style="outline: none;" />
    </Button>
  </ButtonGroup>
</div>
