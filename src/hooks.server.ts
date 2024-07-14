import type { Handle } from '@sveltejs/kit';
import { getGoogleApiToken } from './lib/api/google';
import { GOOGLE_ACCESS_TOKEN } from '$env/static/private';

export const handle = (async ({ event, resolve }) => {
	let authCookie = event.cookies.get('google-auth-token');

	if (!authCookie || authCookie === '' || authCookie === 'null' || authCookie === 'undefined') {
		let bearerToken = await getGoogleApiToken();
		event.cookies.set('google-auth-token', bearerToken, {
			maxAge: 60 * 60 * 1, // 1 hour
			path: '/'
		});
	}

	event.locals.bearerToken = authCookie;

	return await resolve(event);
}) satisfies Handle;
