<script lang="ts">
	import Icon from '@iconify/svelte';

	let { icon, classes = '', ...props }: { icon: string; classes?: string } = $props();
</script>

<Icon {icon} class={classes} {...props} />
