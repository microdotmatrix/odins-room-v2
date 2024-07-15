<script lang="ts">
	import { page } from '$app/stores';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { limit, gridRows } from '$lib/stores';
	import { goto } from '$app/navigation';
	import Icon from '@/components/icon.svelte';
	import type { Snapshot } from './$types';

	let { data } = $props();

	let { images } = data;
	let { albumId } = $page.params;

	const { transition } = setupViewTransition();

	let pageSize = $derived($page.url.searchParams.get('q'));

	const loadMore = () => {
		limit.update((n) => n + 12);
		goto(`?q=${$limit}`, {
			replaceState: false,
			noScroll: true
		});
		gridRows.update((n) => n + 2);
	};

	let container: HTMLElement;

	export const snapshot: Snapshot = {
		capture: () => {
			return container.parentElement?.scrollTop;
		},
		restore: (scrollTop) => {
			if (container.parentElement) {
				container.parentElement.scrollTop = scrollTop;
			}
		}
	};
</script>

<h4 class="mr-4 text-right xl:mr-8">{data.title}</h4>

<ul class="gallery" bind:this={container}>
	{#each $images.slice(0, pageSize) as image (image.id)}
		<li class="gallery-cell" use:transition={`image-${image.id}`}>
			<a href="/albums/{albumId}/{image.id}" class="gallery-image" data-sveltekit-noscroll>
				<img
					src="{image.baseUrl}=w800"
					alt={image.filename}
					height="800"
					width="800"
					loading="lazy"
					id="thumbnail"
					class="size-full object-cover"
				/>
			</a>
		</li>
	{/each}
	{#if $limit < $images.length}
		<button
			class="m-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-8 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 md:m-0 lg:py-2"
			onclick={loadMore}
		>
			Load More <Icon icon="mdi:plus" classes="size-4" />
		</button>
	{/if}
</ul>

<style>
	.gallery {
		display: grid;
		grid-auto-flow: dense;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		padding-bottom: 4rem;
		@media (min-width: 768px) {
			grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
			grid-gap: 0.25rem;
			padding-bottom: 0;
		}
	}
	.gallery .gallery-cell {
		grid-column: span 1;
		grid-row: span 1;
		position: relative;
		& .gallery-image > img {
			display: flex;
			width: 100%;
			height: 100%;
			border-radius: 0;
			object-fit: cover;
			object-position: center;
			aspect-ratio: 1/1;
		}
	}
	.gallery .gallery-cell:nth-child(1) {
		grid-column: span 2;
		grid-row: span 2;
	}
	.gallery .gallery-cell:nth-child(4n) {
		grid-column: span 2;
		grid-row: span 2;
	}
	.gallery .gallery-cell:last-of-type {
		grid-column: span 1;
		grid-row: span 1;
	}
</style>
