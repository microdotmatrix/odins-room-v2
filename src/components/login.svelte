<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let loading = $state(false);

	const handleSubmit = () => {
		loading = true;
		// @ts-ignore
		return async ({ result }) => {
			await applyAction(result);
			loading = false;
		};
	};
</script>

<form action="/auth?/login" method="post" use:enhance={handleSubmit}>
	<div class="field">
		<label for="email" class="label">Email</label>
		<p class="control">
			<input
				id="email"
				name="email"
				value={form?.values?.email ?? ''}
				class="input input-bordered rounded-none"
				type="email"
				placeholder="Email"
				required
			/>
		</p>
	</div>
	<div class="field">
		<label for="password" class="label">Password</label>
		<p class="control">
			<input
				id="password"
				name="password"
				class="input input-bordered rounded-none"
				type="password"
				placeholder="Password"
				required
			/>
		</p>
	</div>
	<div class="join mt-4">
		<button disabled={loading} type="submit" class="btn btn-primary join-item">
			Sign in
			{#if loading}
				<span class="loading loading-ring loading-sm"></span>
			{/if}
		</button>
		<button type="reset" class="btn join-item btn-neutral"> Clear </button>
	</div>
</form>

<style>
	form {
		width: 25rem;
		max-width: 80%;
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin: auto;
	}
	input[type='email'],
	input[type='password'] {
		width: 100%;
	}
	button {
		flex: 1;
	}
</style>
