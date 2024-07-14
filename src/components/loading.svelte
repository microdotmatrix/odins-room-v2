<script>
	import { fade } from 'svelte/transition';
</script>

<div
	in:fade={{ duration: 500 }}
	out:fade={{ duration: 500 }}
	class="overlay fixed z-50 grid h-screen w-screen place-content-center bg-black bg-opacity-75 backdrop-blur-sm"
>
	<div class="loader">
		<div class="orb" style="--index: 0"></div>
		<div class="orb" style="--index: 1"></div>
		<div class="orb" style="--index: 2"></div>
		<div class="orb" style="--index: 3"></div>
		<div class="orb" style="--index: 4"></div>
	</div>
</div>

<style>
	.loader {
		--size-loader: 50px;
		--size-orb: 10px;
		width: var(--size-loader);
		height: var(--size-loader);
		position: relative;
		transform: rotate(45deg);
	}

	.orb {
		position: absolute;
		width: 100%;
		height: 100%;
		--delay: calc(var(--index) * 0.1s);
		animation: orbit7456 ease-in-out 1.5s var(--delay) infinite;
		opacity: calc(1 - calc(0.2 * var(--index)));
	}

	.orb::after {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		width: var(--size-orb);
		height: var(--size-orb);
		background-color: #3ae374;
		box-shadow: 0px 0px 20px 2px #3ae374;
		border-radius: 50%;
	}

	@keyframes orbit7456 {
		0% {
		}

		80% {
			transform: rotate(360deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
