// import { GOOGLE_ACCESS_TOKEN } from '$env/static/private';

export const getMediaItems = async (bearerToken: string, albumId: string) => {
	let pageSize = '10';
	/**
	 * @type {any[]}
	 */
	let mediaItems: any[] = [];
	let pageToken = '';
	// let bearerToken = GOOGLE_ACCESS_TOKEN;

	do {
		const response = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems:search`, {
			method: 'POST',
			body: JSON.stringify({
				albumId,
				pageSize,
				pageToken
			}),
			headers: {
				Authorization: `Bearer ${bearerToken}`
			},
			cache: 'no-store'
		});

		const data = await response.json();

		if (data.mediaItems) {
			mediaItems = [...mediaItems, ...data.mediaItems];
		}

		pageToken = data.nextPageToken;
	} while (pageToken);

	if (!mediaItems) {
		throw new Error('Unable to get media items');
	}

	return mediaItems;
};

export const getImage = async (bearerToken: string, mediaItemId: string) => {
	// let bearerToken = GOOGLE_ACCESS_TOKEN;

	const response = await fetch(
		`https://photoslibrary.googleapis.com/v1/mediaItems/${mediaItemId}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${bearerToken}`
			},
			cache: 'no-store'
		}
	);

	const image = await response.json();

	if (!image) {
		throw new Error('Unable to get image');
	}

	return image;
};

export const getImages = async (bearerToken: string) => {
	let pageSize = '10';
	/**
	 * @type {any[]}
	 */
	let mediaItems: any[] = [];
	let pageToken = '';

	do {
		const response = await fetch(
			`https://photoslibrary.googleapis.com/v1/mediaItems/?pageSize=${pageSize}&pageToken=${pageToken}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${bearerToken}`
				}
			}
		);

		const data = await response.json();

		if (data.mediaItems) {
			mediaItems = [...mediaItems, ...data.mediaItems];
		}

		pageToken = data.nextPageToken;
	} while (pageToken);

	if (!mediaItems) {
		throw new Error('Unable to get media items');
	}

	return mediaItems;
};
