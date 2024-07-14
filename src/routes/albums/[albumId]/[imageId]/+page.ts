import type { PageLoad } from './$types';

export const load = (async ({ data, params }) => {
	return {
		imageId: params.imageId
	};
}) satisfies PageLoad;
