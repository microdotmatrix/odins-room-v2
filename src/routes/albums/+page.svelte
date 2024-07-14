<script lang="ts">
	import AlbumCard from '@/components/media/card.svelte';
	import type { PageData } from './$types';
	import Loading from '@/components/loading.svelte';
	export let data: PageData;

	$: ({ albums } = data);
</script>

{#await $albums}
	<Loading />
{:then albums}
	<div class="container max-w-none px-8 lg:px-[4vw] 2xl:px-[12vw]">
		<div class="grid gap-6 sm:grid-cols-12">
			<!-- card one -->
			{#each albums.slice(1, 2) as album}
				<div
					class="col-span-12 sm:col-span-7 sm:self-end md:col-span-8 lg:col-span-5 lg:col-start-3"
				>
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card two -->
			{#each albums.slice(2, 3) as album}
				<div class="col-span-12 sm:col-span-5 sm:self-end md:col-span-4 lg:col-span-3">
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card three -->
			{#each albums.slice(3, 4) as album}
				<div class="col-span-12 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card four -->
			{#each albums.slice(5, 6) as album}
				<div class="col-span-12 sm:col-span-6 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card five -->
			{#each albums.slice(6, 7) as album}
				<div class="col-span-12 sm:col-span-6 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card six -->
			{#each albums.slice(7, 8) as album}
				<div
					class="col-span-12 sm:col-span-5 sm:self-end md:col-span-4 lg:col-span-3 lg:col-start-3"
				>
					<AlbumCard {album} />
				</div>
			{/each}
			{#each albums.slice(8, 9) as album}
				<div class="col-span-12 sm:col-span-7 sm:self-end md:col-span-8 lg:col-span-5">
					<AlbumCard {album} />
				</div>
			{/each}
			{#each albums.slice(9, 10) as album}
				<div class="col-span-12 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			{#each albums.slice(10, 11) as album}
				<div class="col-span-12 sm:col-span-6 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			{#each albums.slice(11, 12) as album}
				<div class="col-span-12 sm:col-span-6 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
		</div>
	</div>
{:catch error}
	<p>Error: {error.message}</p>
{/await}

<style>
	.album-grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		grid-gap: 1.5rem;
		@media (min-width: 768px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		@media (min-width: 1280px) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.album-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;

		position: relative;
		& .title {
			position: absolute;
			bottom: 1em;
			left: 1em;
			width: fit-content;
			padding: var(--size-fluid-1) var(--size-fluid-2);
		}
	}

	figure {
		position: relative;
		width: 100%;
		min-height: 480px;
		& img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	figure .count > span {
		display: inline-flex;
		font-size: var(--font-size-fluid-0);
		font-weight: 600;
	}
</style>
