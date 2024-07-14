import type { LayoutLoad } from './$types';
import { writable } from 'svelte/store';
import { cache } from '$lib/cache';

export const load = (async ({ data, params }) => {
	const url = `/api/albums/${params.albumId}`;
	let { albumData, title } = data;

	if (cache.has(url)) {
		return {
			images: writable(cache.get(url))
		};
	}
	return {
		images: writable(albumData),
		title: title
	};
}) satisfies LayoutLoad;
