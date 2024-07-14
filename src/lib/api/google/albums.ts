// import { GOOGLE_ACCESS_TOKEN } from '$env/static/private';

export const getAlbum = async (bearerToken: string, albumId: string) => {
	// let bearerToken = GOOGLE_ACCESS_TOKEN;

	const response = await fetch(`https://photoslibrary.googleapis.com/v1/albums/${albumId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${bearerToken}`
		}
	});
	const album = await response.json();

	if (!album) {
		throw new Error('Unable to get album');
	}
	return album;
};

export const getAlbums = async (bearerToken: string) => {
	let pageToken = '';
	let pageSize = '50';
	let albums: any[] = [];

	// let bearerToken = GOOGLE_ACCESS_TOKEN;

	do {
		const response = await fetch(
			`https://photoslibrary.googleapis.com/v1/albums/?pageSize=${pageSize}&pageToken=${pageToken}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${bearerToken}`
				}
			}
		);
		const data = await response.json();

		if (data.albums) {
			albums = [...albums, ...data.albums];
		}
		pageToken = data.nextPageToken;
	} while (pageToken);

	if (!albums) {
		throw new Error('Unable to get albums');
	}

	return albums;
};
