import type { PageLoad } from './$types';
import { writable } from 'svelte/store';
import { cache } from '$lib/cache';

export const load = (async ({ data }) => {
	const url = '/api/albums';
	let albumData = await data.albumsData;

	if (cache.has(url)) {
		return {
			albums: writable(cache.get(url))
		};
	}
	return {
		albums: writable(albumData)
	};
}) satisfies PageLoad;
