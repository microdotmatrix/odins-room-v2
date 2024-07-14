<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly, scale } from 'svelte/transition';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { smoothload } from '$lib/utils/load';
	import { formatDate } from '$lib/utils/helpers';
	import Image from '@/components/media/image.svelte';
	import Video from '@/components/media/video.svelte';
	import Parent from '@/components/media/parent.svelte';

	let { data } = $props();

	let { images } = data;
	let { imageId } = $page.params;

	type ImageProps = {
		id: string;
		baseUrl: string;
		filename: string;
		mediaMetadata: {
			creationTime: string;
		};
	};

	let image = $images.find((image: ImageProps) => image.id === imageId);

	const { transition } = setupViewTransition();
</script>

<div
	class="absolute inset-0 z-10 flex max-h-screen flex-row flex-col-reverse items-center justify-between xl:flex-row"
>
	<aside class="flex-none px-2 pb-24 pt-4 xl:flex-1 xl:px-4 xl:py-0">
		<h4 class="flex items-center gap-4">
			<span class="flex-none" in:fly={{ x: -200, duration: 800 }}>
				{formatDate(image.mediaMetadata.creationTime)}
			</span>
		</h4>
		<div class="flex w-full items-center justify-end">
			<span in:fly={{ x: 200, duration: 800, delay: 800 }} class="mr-4 text-lg">Taken by:</span>
			<span in:scale={{ duration: 200, delay: 1500 }}><Parent {image} /></span>
		</div>
	</aside>
	<article class="relative size-full max-h-screen flex-[2] overflow-hidden bg-black">
		<img
			src="{image.baseUrl}=w64"
			alt={image.filename}
			height="64"
			width="64"
			class="bg-img absolute z-10 size-full object-cover blur-lg"
			in:fade={{ duration: 800 }}
		/>
		<div class="overlay" in:fade={{ duration: 200 }}></div>
		<figure
			class="absolute left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-black xl:h-full xl:max-h-[90vh] xl:w-[80%] 2xl:h-fit 2xl:w-fit"
			use:transition={`image-${image.id}`}
		>
			{#if image.mimeType === 'video/mp4'}
				<Video video={image} />
			{:else}
				<Image {image} />
			{/if}
		</figure>
	</article>
</div>

<style>
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: theme('colors.base-300');
		opacity: 0.5;
		mix-blend-mode: overlay;
		backdrop-filter: blur(4px);
		z-index: 10;
		animation: fadeLoop 10s infinite;
	}
	@keyframes fadeLoop {
		0% {
			opacity: 0.25;
			filter: contrast(130%);
		}
		50% {
			opacity: 0.5;
			filter: contrast(120%);
		}
		100% {
			opacity: 0.25;
			filter: contrast(130%);
		}
	}
</style>
