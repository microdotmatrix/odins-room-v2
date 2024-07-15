<script lang="ts">
	import Login from '@/components/login.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<Login {form} />
