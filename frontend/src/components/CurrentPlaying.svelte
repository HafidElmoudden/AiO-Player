<script>
  import { AudioPlayer } from "../services/Audio";
  import { getVideoData } from "../store/Youtube";
  import { get } from "svelte/store";
  import { ForwardStepSolid, BackwardStepSolid, PlaySolid, PauseSolid, VolumeUpSolid, ArrowsRepeatSolid, ArrowsRepeat1Solid } from "flowbite-svelte-icons";
  import VolumeMute from "../assets/images/volume-mute.svelte";
  import VolumePanel from "./VolumePanel.svelte";
  import { LocalStorageService, StorageKey } from "../services/storage";

  let actionIconsSize = 24;
  let videoData = getVideoData(get(AudioPlayer.currentlyPlaying));
  let isPlaying = true;
  let volume = LocalStorageService.get(StorageKey.VOLUME_KEY) || 0.5;
  let loop = false;
  let cachedVolume = LocalStorageService.get(StorageKey.VOLUME_KEY) || 0.5;
  let isShowVolumePanel = false;

  AudioPlayer.isPlaying.subscribe((value) => {
    isPlaying = value;
  });
  AudioPlayer.currentlyPlaying.subscribe((value) => {
    videoData = getVideoData(value);
    console.log("Currently Playing Video Data:", get(AudioPlayer.currentlyPlaying), videoData);
  });

  let showTimeoutId;
  
  function handleVolumeMouseEnter() {
    isShowVolumePanel = true;
  }

  function handleVolumeMouseLeave() {
    showTimeoutId = setTimeout(() => {
      isShowVolumePanel = false;
    }, 100);
  }
  const setShowVolumePanel = (value) => {
    clearTimeout(showTimeoutId)
    isShowVolumePanel = value;
  }

  const handlePause = () => {
    AudioPlayer.pause();
    isPlaying = false;
  };

  const handlePlay = () => {
    AudioPlayer.play();
    isPlaying = true;
  };

  const handleNext = () => {
    AudioPlayer.next();
  } 

  const handlePrev = () => {
    AudioPlayer.prev();
  }
  const handleVolumeClick = () => {
    cachedVolume = volume;
    volume = 0;
    AudioPlayer.setVolume(0);
    LocalStorageService.set(StorageKey.VOLUME_KEY, volume);
  };

  const handleVolumeChange = (e) => {
    volume = parseInt(e.target.value)/100;
    AudioPlayer.setVolume(volume);
    LocalStorageService.set(StorageKey.VOLUME_KEY, volume);
  }

  const handleMuteClick = () => {
    volume = cachedVolume;
    const parsedVolume = typeof cachedVolume === 'string' ? parseInt(cachedVolume, 10) : cachedVolume;
    AudioPlayer.setVolume(parsedVolume);
    LocalStorageService.set(StorageKey.VOLUME_KEY, volume);
  };

  const handleLoopClick = () => {
    loop = !loop;
    AudioPlayer.setLoop(loop);
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
    <BackwardStepSolid size="md" class="outline-none cursor-pointer" on:click={handlePrev}/>
    {#if !isPlaying}
      <PlaySolid
        size="md"
        on:click={handlePlay}
        class="outline-none cursor-pointer"
        />
        {/if}
        
        {#if isPlaying}
        <PauseSolid
        size="md"
        class="outline-none cursor-pointer"
        on:click={handlePause}
      />
    {/if}

    <ForwardStepSolid size="md" class="outline-none cursor-pointer" on:click={handleNext}/>
    {#if !loop}
      <ArrowsRepeatSolid size="md" class="outline-none cursor-pointer" on:click={handleLoopClick}/>
    {/if}
    
    {#if loop}
      <ArrowsRepeat1Solid size="md" class="outline-none cursor-pointer" on:click={handleLoopClick}/>
    {/if}
    <div class="relative place-content-center">

      {#if volume != 0}
        <VolumeUpSolid
          size="md"
          on:click={handleVolumeClick}
          on:mouseenter={handleVolumeMouseEnter}
          on:mouseleave={handleVolumeMouseLeave}
          class="cursor-pointer peer"
        />
      {/if}
      {#if volume == 0}
      <!-- I wish if this could match the size of Volume up but 🤷‍♂️ -->
        <VolumeMute
          width={actionIconsSize}
          height={actionIconsSize}
          onClick={handleMuteClick}
          on:mouseenter={handleVolumeMouseEnter}
          on:mouseleave={handleVolumeMouseLeave}
        />
      {/if}
      <VolumePanel volume={volume} handleVolumeChange={handleVolumeChange} show={isShowVolumePanel} setShow={setShowVolumePanel}/>
    </div>
  </div>
</div>
