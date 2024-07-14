<script lang="ts">
	type VideoProps = {
		baseUrl: string;
	};

	let { video }: { video: VideoProps } = $props();
</script>

<video controls autoPlay muted style="height: 100%; width: 100%; max-height: 90vh">
	<source src={`${video.baseUrl}=dv` || null} type="video/mp4" />
	<track kind="captions" />
</video>
