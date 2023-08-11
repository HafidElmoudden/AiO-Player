import { writable, derived, get } from 'svelte/store'
import { GetStreamURL } from '../../wailsjs/go/main/App.js';

enum StreamFetchState {
	NotFetched,
	Fetching,
	Fetched,
	Error
}

const streamData = writable({} as any)

const streamFetchState = writable<StreamFetchState>()

async function getStreamData(videoId: string) {
    streamFetchState.set(StreamFetchState.Fetching);
    await GetStreamURL(videoId).then(result => {
        streamData.set(result);
        streamFetchState.set(StreamFetchState.Fetched);
      }).catch(err => {
          console.log("Error", err);
          streamFetchState.set(StreamFetchState.Error);
      });
  
      streamData.subscribe(value => {
      });
      console.log("hello stream: ",get(streamData));
}

export {getStreamData, streamFetchState, streamData, StreamFetchState}