<script lang="ts">
	type ImageProps = {
		id: string;
		baseUrl: string;
		filename: string;
	};

	let { image }: { image: ImageProps } = $props();
</script>

<img
	id="photo"
	class="size-full object-cover"
	srcset="{image.baseUrl}=w800, {image.baseUrl}=w1024 1.5x, {image.baseUrl}=w1280 2x"
	src="{image.baseUrl}=w800"
	alt={image.filename}
	height="800"
	width="800"
	loading="eager"
	sizes="(max-width: 600px) 800px, 100vw"
/>
