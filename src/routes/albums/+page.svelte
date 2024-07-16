<script lang="ts">
	import AlbumCard from '@/components/media/card.svelte';
	import Loading from '@/components/loading.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let { albums } = data;
</script>

{#await $albums}
	<Loading />
{:then $albums}
	<div class="container max-w-none px-8 lg:px-[4vw] 2xl:px-[12vw]">
		<div class="grid gap-6 sm:grid-cols-12">
			<!-- card one -->
			{#each $albums.slice(1, 2) as album}
				<div
					class="col-span-12 sm:col-span-7 sm:self-end md:col-span-8 lg:col-span-5 lg:col-start-3"
				>
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card two -->
			{#each $albums.slice(2, 3) as album}
				<div class="col-span-12 sm:col-span-5 sm:self-end md:col-span-4 lg:col-span-3">
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card three -->
			{#each $albums.slice(3, 4) as album}
				<div class="col-span-12 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card four -->
			{#each $albums.slice(5, 6) as album}
				<div class="col-span-12 sm:col-span-6 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card five -->
			{#each $albums.slice(6, 7) as album}
				<div class="col-span-12 sm:col-span-6 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			<!-- card six -->
			{#each $albums.slice(7, 8) as album}
				<div
					class="col-span-12 sm:col-span-5 sm:self-end md:col-span-4 lg:col-span-3 lg:col-start-3"
				>
					<AlbumCard {album} />
				</div>
			{/each}
			{#each $albums.slice(8, 9) as album}
				<div class="col-span-12 sm:col-span-7 sm:self-end md:col-span-8 lg:col-span-5">
					<AlbumCard {album} />
				</div>
			{/each}
			{#each $albums.slice(9, 10) as album}
				<div class="col-span-12 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			{#each $albums.slice(10, 11) as album}
				<div class="col-span-12 sm:col-span-6 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
			{#each $albums.slice(11, 12) as album}
				<div class="col-span-12 sm:col-span-6 md:col-span-4">
					<AlbumCard {album} />
				</div>
			{/each}
		</div>
	</div>
{:catch error}
	<p>Error: {error.message}</p>
{/await}
