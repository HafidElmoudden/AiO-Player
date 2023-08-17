import { getStreamData, streamData, streamFetchState, StreamFetchState } from "../store/Stream";
import { playlistData } from "../store/Youtube";
import { get, writable } from "svelte/store";
import { shuffleArray } from "../utils/utils";
import { LocalStorageService, StorageKey } from "./storage";

export class AudioPlayer {
    static audio: HTMLAudioElement;
    static isPlaying = writable(false);
    static currentlyPlaying = writable("");
    static queue = writable([]);
    static currentQueueIndex = writable(0);

    static async play(id?: string, url?: string | null)  {
        if (this.audio == null) {
            this.audio = new Audio();
            const cachedVolume = LocalStorageService.get(StorageKey.VOLUME_KEY);
            const parsedVolume = typeof cachedVolume === 'string' ? parseInt(cachedVolume, 10) : cachedVolume || 0.5;
            this.audio.volume = parsedVolume;
            this.audio.addEventListener("ended", () => {
                // if(get(this.currentlyPlaying) === id)
                //     this.queue.set(get(this.queue).filter((item) => item.id !== id));
                // this.queue.set(get(this.queue).shift());
                this.currentQueueIndex.set(get(this.currentQueueIndex) + 1);
                this.incrementQueueIndex();
                if(get(this.queue).length >= this.getCurrentQueueIndex() + 1)
                    this.play(get(this.queue)[this.getCurrentQueueIndex()])
            })
        }

        if(id && !url) {
            await getStreamData(id);
            if(get(streamFetchState) == StreamFetchState.Error) {
                console.error("We couldn't play the audio. Check logs for more informations");
                // this.queue.set(get(this.queue).shift());
                this.incrementQueueIndex();
                this.play(get(this.queue)[this.getCurrentQueueIndex()]);
                return;
            }
            url = get(streamData);
        }

        if (url && this.audio) {
            this.audio.src = url;
        }
        try {
            this.audio.play();
            if(id)
                AudioPlayer.currentlyPlaying.set(id);
            AudioPlayer.isPlaying.set(true);
        } catch(err) {
            console.log("Error occured while trying to play the audio!", err);
        }
    }

    static pause() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        this.audio.pause();
    }

    static stop() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    static next() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        // this.queue.set(get(this.queue).shift());
        this.incrementQueueIndex();
        if(get(this.queue).length >= this.getCurrentQueueIndex() + 1)
            this.play(get(this.queue)[this.getCurrentQueueIndex()]);
    }

    static prev() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        // this.queue.set(get(this.queue).shift());
        this.decrementQueueIndex();
        if(get(this.queue).length >= this.getCurrentQueueIndex() + 1)
            this.play(get(this.queue)[this.getCurrentQueueIndex()]);
    }

    static setVolume(volume: number) {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        this.audio.volume = volume;
    }

    static getVolume() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        return this.audio.volume;
    }

    static setMuted(muted: boolean) {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        this.audio.muted = muted;
    }

    static getMuted() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        return this.audio.muted;
    }

    static setLoop(loop: boolean) {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        this.audio.loop = loop;
    }

    static getLoop() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        return this.audio.loop;
    }

    static seek(time: number) {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        this.audio.currentTime = time;
    }

    static getDuration() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        return this.audio.duration;
    }

    static getCurrentTime() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        return this.audio.currentTime;
    }

    static isEnded() {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        return this.audio.ended;
    }

    static addEventListener(
        event: string,
        callback: EventListenerOrEventListenerObject
    ) {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        this.audio.addEventListener(event, callback);
    }

    static removeEventListener(
        event: string,
        callback: EventListenerOrEventListenerObject
    ) {
        if (this.audio == null) {
            console.error("There is no audio currently playing");
            return;
        }
        this.audio.removeEventListener(event, callback);
    }
    static shuffle() {
        const shuffledArray = shuffleArray(get(playlistData).Videos.map((item) => item.ID));
        this.addToQueue(shuffledArray);
    }

    static addToQueue(id: string | string[]) {
        if(typeof id === "string")
            this.queue.set([...get(this.queue), id]);
        else if (typeof id === "object")
            this.queue.set([...get(this.queue), ...id])
    }

    static incrementQueueIndex() {
        this.currentQueueIndex.set(get(this.currentQueueIndex) + 1);
    }
    static decrementQueueIndex() {
        this.currentQueueIndex.set(get(this.currentQueueIndex) - 1);
    }

    static getCurrentQueueIndex() {
        return get(this.currentQueueIndex);
    }
}
