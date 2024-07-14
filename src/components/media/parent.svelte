<script lang="ts">
	import mom from '$lib/images/hayley.jpg';
	import dad from '$lib/images/john.jpg';

	type ImageProps = {
		mediaMetadata: {
			photo?: {
				cameraMake: string;
				cameraModel: string;
			};
			video?: {
				cameraMake: string;
				cameraModel: string;
			};
		};
	};

	let { image }: { image: ImageProps } = $props();

	let isDad =
		(image.mediaMetadata.photo &&
			image.mediaMetadata.photo.cameraMake === 'Apple' &&
			image.mediaMetadata.photo.cameraModel === 'iPhone 11') ||
		(image.mediaMetadata.video &&
			image.mediaMetadata.video.cameraMake === 'Apple' &&
			image.mediaMetadata.video.cameraModel === 'iPhone 11');
</script>

<div class="avatar">
	<div class="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
		{#if isDad}
			<img src={dad} alt="Dad" />
		{:else}
			<img src={mom} alt="Mom" />
		{/if}
	</div>
</div>
