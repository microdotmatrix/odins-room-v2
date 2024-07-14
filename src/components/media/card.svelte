<script lang="ts">
	import { smoothload } from '$lib/utils/load';

	type AlbumProps = {
		id: string;
		title: string;
		coverPhotoBaseUrl: string;
		mediaItemsCount: number;
	};

	let { album }: { album: AlbumProps } = $props();
</script>

<a
	href="/albums/{album.id}?q=12"
	class="group relative block h-[380px] overflow-hidden bg-black shadow-xl shadow-gray-800/50 transition-shadow duration-300 hover:shadow-accent/50 lg:h-[480px] 2xl:h-[540px]"
>
	<img
		src={album.coverPhotoBaseUrl}
		srcset="{album.coverPhotoBaseUrl}=w320 320w, {album.coverPhotoBaseUrl}=w420 420w, {album.coverPhotoBaseUrl}=w640 640w"
		sizes="(max-width: 768px) 100vw, 320px"
		alt={album.title}
		height="420"
		width="420"
		loading="lazy"
		class="absolute inset-0 h-full w-full scale-100 object-cover opacity-100 transition-all duration-300 group-hover:scale-105 group-hover:opacity-50"
		use:smoothload
	/>
	<div class="relative p-4 sm:p-6 lg:p-8">
		<div class="avatar placeholder">
			<div class="w-12 rounded-full bg-neutral text-neutral-content">
				<span class="text-md font-sans font-medium uppercase tracking-widest text-pink-500">
					{album.mediaItemsCount}
				</span>
			</div>
		</div>

		<div class="mt-56 sm:mt-48 xl:mt-40">
			<div
				class="transition-all lg:translate-y-8 lg:transform lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
			>
				<h5 class="text-balance uppercase leading-tight text-white">
					{album.title}
				</h5>
			</div>
		</div>
	</div>
</a>
