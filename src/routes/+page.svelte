<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import familyImage from '$lib/images/the-family.jpg?enhanced';
	import Login from '@/components/login.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let { session, profile } = data;

	let heading = $state("Welcome to Odin's Room");
	let message = $state(
		'A family photo album for my son, Odin. Access restricted to family and friends - ask dad for a login.'
	);
</script>

<section>
	<div class="lg:grid lg:min-h-screen lg:grid-cols-12">
		<section
			class="relative flex h-64 items-end bg-base-300 lg:col-span-5 lg:h-full xl:col-span-6"
			in:fade={{ delay: 1000, duration: 500 }}
			out:fade={{ duration: 500 }}
		>
			<enhanced:img
				alt="Odin's Room"
				src="{familyImage}?w=1280;640;400"
				sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
				class="absolute inset-0 h-full w-full object-cover opacity-60"
			/>

			<div class="hidden lg:relative lg:block lg:p-8">
				<h2
					class="mt-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
					in:fly={{ x: -100, duration: 300, delay: 1500 }}
				>
					{heading}
				</h2>

				<p
					class="mb-8 mt-4 indent-12 text-lg font-semibold leading-relaxed text-gray-800 dark:text-slate-300"
					in:fly={{ x: 100, duration: 300, delay: 2500 }}
				>
					{message}
				</p>
			</div>
		</section>

		<article
			class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
		>
			<div class="max-w-xl lg:max-w-3xl">
				<div class="relative mt-6 block lg:hidden">
					<h1 class="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
						{heading}
					</h1>

					<p class="mt-4 leading-relaxed text-gray-500">
						{message}
					</p>
				</div>

				{#if !session}
					<div in:fly={{ y: 50, duration: 300, delay: 400 }} out:fly={{ y: 50, duration: 300 }}>
						<Login {form} />
					</div>
				{:else}
					<div in:fly={{ y: 50, duration: 300, delay: 400 }} out:fly={{ y: 50, duration: 300 }}>
						<h3>Welcome back {session.user?.email}</h3>
					</div>
				{/if}
			</div>
		</article>
	</div>
</section>
