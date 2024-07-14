import { getAlbum, getMediaItems } from '$lib/api/google';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET = (async ({ locals, params, setHeaders }) => {
	const { albumId } = params;
	const { bearerToken } = locals;

	if (!bearerToken) {
		throw new Error('No bearer token');
	}

	setHeaders({
		'Cache-Control': 'public, max-age=600'
	});

	const album = await getAlbum(bearerToken, albumId);
	const images = await getMediaItems(bearerToken, albumId);

	return json({ images, album });
}) satisfies RequestHandler;
