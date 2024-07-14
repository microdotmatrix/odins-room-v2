import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } from '$env/static/private';

export const getGoogleApiToken = async () => {
	const result = await fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		body: JSON.stringify({
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
			refresh_token: GOOGLE_REFRESH_TOKEN,
			grant_type: 'refresh_token'
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const tokenData = await result.json();
	console.log(tokenData);

	return tokenData['access_token'];
};
