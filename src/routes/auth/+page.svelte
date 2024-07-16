<script lang="ts">
	import Login from '@/components/login.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to view photo albums" />
</svelte:head>

<Login {form} />
