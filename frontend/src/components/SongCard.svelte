<script>
  import { getStreamData, streamData } from "../store/Stream";
  import Play from "../assets/images/play.svelte";
  import { get } from "svelte/store";
  import { Howl, Howler } from "howler";
  import { AudioPlayer } from "../services/Audio";

  export let img = "";
  export let title = "";
  export let id = "";

  const handleAudio = async () => {
  try {
    await getStreamData(id);
    const data = get(streamData);

    if (!data) {
      console.error('No audio stream data found.');
      return;
    }

    AudioPlayer.play(id, data);

    AudioPlayer.addEventListener('timeupdate', (event) => {
      // console.error('Audio timeupdate:', event.target.currentTime);
    });

    AudioPlayer.addEventListener('ended', () => {
      console.log('Audio playback ended.');
    });

    
    console.log('Stream Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<div
  class="max-h-40 w-full rounded-lg custom-shadow flex mt-5"
>
  <img src={img} alt="" class="w-40 h-20 object-cover rounded-l-lg" />

  <div class="flex flex-row w-full items-center justify-between px-4">
    <h5 class="font-bold truncate w-[16rem] max-w-[16rem] dark:text-white">
      {title}
    </h5>
    <Play width={40} height={40} onClick={() => handleAudio()} />
  </div>
</div>

<style>
  .custom-shadow {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }
</style>
