import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	let response = await fetch('/api/albums');
	let data = await response.json();

	return {
		albumsData: data.albums
	};
}) satisfies PageServerLoad;
