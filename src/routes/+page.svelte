<script lang="ts">
	import familyImage from '$lib/images/the-family.jpg?w=1280;640;400';
	import Login from '@/components/login.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex max-h-screen items-center">
	<figure class="flex-1">
		<enhanced:img
			src={familyImage}
			alt="The Family"
			class="h-full w-full object-cover"
			sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
		/>
	</figure>
	<article class="flex flex-1 flex-col items-center justify-center">
		<h1>Odin's Room</h1>
		<Login {form} />
	</article>
</div>
