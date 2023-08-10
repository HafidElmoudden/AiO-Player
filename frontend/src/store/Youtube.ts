import { writable, derived, get } from 'svelte/store'
import { SearchYoutube } from '../../wailsjs/go/main/App.js';

enum FetchState {
	NotFetched,
	Fetching,
	Fetched,
	Error
}

const data = writable({} as any)

const isFetching = writable<FetchState>()

async function getPlaylistData(playlistUrl: string) {
	isFetching.set(FetchState.Fetching);
	
	await SearchYoutube(playlistUrl).then(result => {
	  data.set(result);
	  isFetching.set(FetchState.Fetched);
    }).catch(err => {
		console.log("Error", err);
		isFetching.set(FetchState.Error);
	});

	data.subscribe(value => {
		console.log("value", value);
	});
	console.log("hello : ",get(data));
}

export { isFetching, data, getPlaylistData, FetchState }