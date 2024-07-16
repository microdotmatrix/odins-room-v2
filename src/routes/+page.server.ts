import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (!session) {
		return {
			session: null,
			user: null
		};
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.single();

	return {
		session,
		profile
	};
}) satisfies PageServerLoad;
