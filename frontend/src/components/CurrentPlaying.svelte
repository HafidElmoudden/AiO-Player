<script>
  import PlayIcon from "../assets/images/play-icon.svelte";
  import { AudioPlayer } from "../services/Audio";
  import { getVideoData } from "../store/Youtube";
  import { get } from "svelte/store";
  import PlaylistIcon from "../assets/images/playlist-icon.svelte";
  import PauseIcon from "../assets/images/pause-icon.svelte";
  import VolumeMax from "../assets/images/volume-max.svelte";
  import VolumeMute from "../assets/images/volume-mute.svelte";
  import VolumePanel from "./VolumePanel.svelte";

  let actionIconsSize = 24;
  let videoData = getVideoData(get(AudioPlayer.currentlyPlaying));
  let isPlaying = true;
  let volume = 0.5;

  AudioPlayer.isPlaying.subscribe((value) => {
    console.log("is happening : ", value);
    isPlaying = value;
  });
  AudioPlayer.currentlyPlaying.subscribe((value) => {
    videoData = getVideoData(value);
    console.log("Video Data:", get(AudioPlayer.currentlyPlaying), videoData);
  });

  const handlePause = () => {
    AudioPlayer.pause();
    isPlaying = false;
  };

  const handlePlay = () => {
    AudioPlayer.play();
    isPlaying = true;
  };

  const handleVolumeClick = () => {
    volume = 0;
    AudioPlayer.setVolume(0);
  };

  const handleMuteClick = () => {
    volume = 0.5;
    AudioPlayer.setVolume(0.5);
  };
</script>

<div
  class="flex fixed bottom-0 justify-between z-50 w-full h-12 border-t-4 border-[#ec4c24]"
>
  <div class="flex">
    <div>
      <img
        src={videoData?.Thumbnails[0].URL}
        alt=""
        class="w-12 h-12 object-cover"
      />
    </div>
    <div class="ml-3">
      <h5 class="font-bold truncate w-[16rem] max-w-[16rem] dark:text-white">
        {videoData?.Title}
      </h5>
      <p class="text-sm truncate w-[16rem] max-w-[16rem] dark:text-white">
        {videoData?.Author}
      </p>
    </div>
  </div>

  <div class="flex h-full justify-center items-center pr-6 gap-6">
    <!-- Maybe change width and height in the future to size since we only need these icons here anyway -->
    {#if !isPlaying}
      <PlayIcon
        width={actionIconsSize}
        height={actionIconsSize}
        onClick={handlePlay}
      />
    {/if}

    {#if isPlaying}
      <PauseIcon
        width={actionIconsSize}
        height={actionIconsSize}
        onClick={handlePause}
      />
    {/if}
    <div class="relative place-content-center">

      {#if volume != 0}
        <VolumeMax
          width={actionIconsSize}
          height={actionIconsSize}
          onClick={handleVolumeClick}
        />
      {/if}
      {#if volume == 0}
        <VolumeMute
          width={actionIconsSize}
          height={actionIconsSize}
          onClick={handleMuteClick}
        />
      {/if}
      <VolumePanel/>
    </div>
  </div>
</div>
