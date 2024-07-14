import { getAlbums } from '$lib/api/google';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ locals, setHeaders }) => {
	const { bearerToken } = locals;

	if (!bearerToken) {
		throw new Error('No bearer token');
	}

	setHeaders({
		'Cache-Control': 'public, max-age=600'
	});

	const albums = await getAlbums(bearerToken);
	return json({ albums });
}) satisfies RequestHandler;
