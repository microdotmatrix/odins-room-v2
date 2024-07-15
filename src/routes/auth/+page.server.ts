import { redirect, fail } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email) {
			return fail(400, {
				signinWithPassword: {
					error: 'Please enter your email',
					values: {
						email
					}
				}
			});
		}

		if (!password) {
			return fail(400, {
				signinWithPassword: {
					error: 'Please enter your password',
					values: {
						email
					}
				}
			});
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: url.origin }
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.',
					values: {
						email
					}
				});
			}

			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					email
				}
			});
		}

		return {
			message: 'Please check your email for a magic link to log into the website.'
		};
	},

	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email) {
			return fail(400, {
				signinWithPassword: {
					error: 'Please enter your email',
					values: {
						email
					}
				}
			});
		}

		if (!password) {
			return fail(400, {
				signinWithPassword: {
					error: 'Please enter your password',
					values: {
						email
					}
				}
			});
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					signinWithPassword: {
						error: 'Invalid credentials.',
						values: {
							email
						}
					}
				});
			}
			return fail(500, {
				signinWithPassword: {
					error: 'Server error. Try again later.',
					values: {
						email
					}
				}
			});
		}

		throw redirect(303, '/albums');
	},

	logout: async ({ locals: { supabase, safeGetSession } }) => {
		const { session } = await safeGetSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
};
