<script lang="ts">
  import TitleBar from "./components/TitleBar.svelte";
  import * as wails from "../wailsjs/runtime/runtime.js";
  import SearchBar from "./components/SearchBar.svelte";
  import Spinner from "./components/Spinner.svelte";
  import { FetchState, data, isFetching } from "./store/Youtube.ts";
  import { get } from "svelte/store";
  import { Card } from "flowbite-svelte";
  import SongCard from "./components/SongCard.svelte";

  let showSpinner: FetchState = FetchState.NotFetched;
  isFetching.subscribe((value) => {
    showSpinner = value;
  });
</script>

<main class="w-full">
  <TitleBar />
  <div class="pt-5">
    <div class="flex justify-center items-center px-10 py-4">
      <SearchBar />
    </div>
    <div class="h-full w-full flex gap-8 items-center justify-center px-10">
      {#if showSpinner == FetchState.Fetching}
        <Spinner />
      {/if}
      {#if showSpinner == FetchState.Error}
        <div class="text-red-500 text-2xl">Error</div>
      {/if}
      {#if showSpinner == FetchState.Fetched}
        <div class="flex flex-col w-full">
          <div class="scrollable-list overflow-y-auto overflow-x-hidden max-h-[400px] flex-grow-1">
            {#each get(data).Videos as item}
              <SongCard id={item.ID} img={item.Thumbnails[item.Thumbnails.length - 1].URL} title={item.Title} />
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>


<style>
  /* Scrollable list container */
  .scrollable-list {
    max-height: 400px;
    overflow-y: auto;
  }

  .scrollable-list::-webkit-scrollbar {
    width: 12px;
    height: 20px;
    margin-right: 10px;
  }

  .scrollable-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .scrollable-list::-webkit-scrollbar-thumb {
    background-color: #ec4c24;
    border-radius: 6px;
    height: 30px;
  }

  .scrollable-list::-webkit-scrollbar-button {
    display: none;
  }
</style>