import { writable } from "svelte/store";

export class AudioPlayer {
    static audio: HTMLAudioElement;
    static isPlaying = writable(false);
    static currentlyPlaying = writable("");

    static play(url?: string | null) {
        if (this.audio == null) {
            this.audio = new Audio();
        }

        if (url && this.audio) {
            this.audio.src = url;
        }
        try {
            this.audio.play();
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
}
