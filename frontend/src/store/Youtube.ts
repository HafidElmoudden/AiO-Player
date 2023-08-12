import { writable, derived, get } from 'svelte/store'
import { SearchYoutube } from '../../wailsjs/go/main/App.js';

enum FetchState {
	NotFetched,
	Fetching,
	Fetched,
	Error
}

const playlistData = writable({} as any)

const isFetching = writable<FetchState>()

async function getPlaylistData(playlistUrl: string) {
	isFetching.set(FetchState.Fetching);
	
	await SearchYoutube(playlistUrl).then(result => {
	  playlistData.set(result);
	  isFetching.set(FetchState.Fetched);
    }).catch(err => {
		console.log("Error", err);
		isFetching.set(FetchState.Error);
	});

	playlistData.subscribe(value => {
		console.log("value", value);
	});
	console.log("hello : ",get(playlistData));
}

function getVideoData(id: string) {
	if(Object.keys(get(playlistData)).length == 0) 
		return null;

    return get(playlistData).Videos.find((item: any) => item.ID == id);
}

export { isFetching, playlistData, getPlaylistData, getVideoData, FetchState }