import type { LayoutServerLoad } from './$types';

export const prerender = 'auto';

export const load = (async ({ fetch, params }) => {
	const { albumId } = params;
	let response = await fetch(`/api/albums/${albumId}`);
	let data = await response.json();

	return {
		albumData: data.images,
		title: data.album.title
	};
}) satisfies LayoutServerLoad;
