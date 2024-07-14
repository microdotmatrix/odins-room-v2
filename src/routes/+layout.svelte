<script>
	import '../app.css';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { navigating, page } from '$app/stores';

	import Icon from '@/components/icon.svelte';
	import ThemeSwitch from '@/components/theme/switch.svelte';

	let { children } = $props();

	setupViewTransition();
</script>

<header class="fixed bottom-4 left-4 z-50 p-2 xl:sticky xl:top-0">
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
			padding: 0.5rem 0.5rem;
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
		}
	}
</style>
