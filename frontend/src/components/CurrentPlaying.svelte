<script>
  import PlayIcon from "../assets/images/play-icon.svelte";
  import { AudioPlayer } from "../services/Audio";
  import { getVideoData } from "../store/Youtube";
  import { get } from "svelte/store";
  import PlaylistIcon from "../assets/images/playlist-icon.svelte";
  import MuteIcon from "../assets/images/mute-icon.svelte";
  let actionIconsSize = "35";
  let videoData = getVideoData(get(AudioPlayer.currentlyPlaying));

  AudioPlayer.currentlyPlaying.subscribe((value) => {
    videoData = getVideoData(value);
    console.log("Video Data:", get(AudioPlayer.currentlyPlaying), videoData);
  });
</script>

<div
  class="flex sticky bottom-0 justify-between z-50 w-full h-12 border-t-4 border-[#ec4c24]"
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

  <div class="flex h-full justify-center items-center">
    <!-- Maybe change width and height in the future to size since we only need these icons here anyway -->
    <PlayIcon width={actionIconsSize} height={actionIconsSize} />
    <!-- <PlaylistIcon width={actionIconsSize} height={actionIconsSize} /> -->
  </div>
</div>
