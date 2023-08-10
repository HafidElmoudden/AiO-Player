<script lang="ts">
  import TitleBar from "./components/TitleBar.svelte";
  import * as wails from "../wailsjs/runtime/runtime.js";
  import SearchBar from "./components/SearchBar.svelte";
  import Spinner from "./components/Spinner.svelte";
  import { FetchState, data, isFetching } from "./store/Youtube.ts";
  import { get } from "svelte/store";
  import { Card } from "flowbite-svelte";

  let showSpinner: FetchState = FetchState.NotFetched;
  isFetching.subscribe((value) => {
    showSpinner = value;
  });
</script>

<main>
  <TitleBar />
  <div class="flex justify-center items-center px-10 py-4">
    <SearchBar />
  </div>
  <div class="h-full flex items-center justify-center px-10">
    {#if showSpinner == FetchState.Fetching}
      <Spinner />
    {/if}
    {#if showSpinner == FetchState.Error}
      <div class="text-red-500 text-2xl">Error</div>
    {/if}
    {#if showSpinner == FetchState.Fetched}
      <div class="flex flex-col">
        {#each get(data).Videos as item, index}
          <li>
            {index + 1}: {item.Title} x
            <Card img={item.Thumbnails[item.Thumbnails.length - 1].URL} href="/" horizontal reverse={false}>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
            </Card>
          </li>
        {/each}
      </div>
    {/if}
  </div>
</main>

<style>
</style>
