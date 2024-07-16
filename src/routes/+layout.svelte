<script lang="ts">
	import '../app.css';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { navigating, page } from '$app/stores';
	import { goto, invalidate } from '$app/navigation';

	import Icon from '@/components/icon.svelte';
	import ThemeSwitch from '@/components/theme/switch.svelte';
	import Meta from '@/components/meta.svelte';

	let { data, children } = $props();

	let { supabase, session } = data;

	let logout = $derived(async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
		return goto('/auth');
	});

	$effect(() => {
		const { data: auth } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => auth.subscription.unsubscribe();
	});

	setupViewTransition();
</script>

<Meta />

<header class="fixed bottom-4 left-4 z-50 p-2 xl:top-0">
	<section
		class="flex w-fit items-center gap-6 rounded-full border border-neutral-300 bg-base-300 px-6 shadow-lg shadow-gray-950/80"
	>
		<nav>
			<a href="/" class:active={$page.url.pathname === '/'}>
				<Icon icon="ph:house-duotone" classes="size-6" />
				<span>Home</span>
			</a>
			<a href="/albums" class:active={$page.url.pathname.includes('/albums')}>
				<Icon icon="ph:images-duotone" classes="size-6" />
				<span>Albums</span>
			</a>
		</nav>
		{#if !session}
			<a href="/auth" class="tooltip tooltip-bottom" data-tip="Login">
				<Icon icon="ph:sign-in" classes="size-6" />
			</a>
		{:else}
			<button onclick={logout} class="tooltip tooltip-bottom" data-tip="Logout">
				<Icon icon="ph:sign-out" classes="size-6" />
			</button>
		{/if}
		<ThemeSwitch />
		<div class="size-6">
			{#if $navigating}
				<Icon icon="svg-spinners:3-dots-fade" classes="size-6" />
			{:else if $page.url.pathname === '/'}
				{''}
			{:else}
				<button onclick={() => history.back()}>
					<Icon icon="carbon:chevron-left" classes="size-6" />
				</button>
			{/if}
		</div>
	</section>
</header>

<main>
	{@render children()}
</main>

<style>
	nav {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		gap: 1rem;
		& a[href] {
			font-family: var(--font-heading);
			display: inline-flex;
			flex-direction: row;
			gap: 0.25rem;
			justify-content: center;
			align-items: center;
			padding: 0.5rem 0.15rem;
			font-size: 1.5rem;
			transition: color 400ms ease;
			position: relative;
			text-align: center;
			&:is(:hover, :focus) {
				color: theme('colors.accent');
				&::after {
					transform: scaleX(0.8);
				}
			}
			&:is(.active) {
				color: theme('colors.accent');
			}
			&::after {
				content: '';
				display: block;
				position: absolute;
				bottom: 8px;
				left: 0;
				width: 100%;
				height: 0.1rem;
				border-radius: 0.25rem;
				background-color: theme('colors.accent');
				transform: scaleX(0);
				transition: transform 400ms ease;
			}
			@media (min-width: 768px) {
				padding: 0.5rem 0.5rem;
			}
		}
	}
</style>
