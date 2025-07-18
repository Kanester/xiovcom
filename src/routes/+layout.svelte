<script lang="ts">
	import Kofi from '$component/Kofi.svelte';
	import Navbar from '$component/Navbar.svelte';
	const { children } = $props();
</script>

<header>
	<Navbar />
</header>

<main>
	{@render children()}
</main>

<footer>
	<strong>&copy; Kiöv — All rights reserved.</strong>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/blog">Blog</a></li>
		<li><a href="/projects">Projects</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
	<Kofi />
</footer>

<style lang="scss">
	@use '$styles/variables' as *;
	:global {
		*,
		*::before,
		*::after {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		html,
		body {
			width: 100%;
			height: 100%;
			scroll-behavior: smooth;
			font-family: system-ui, sans-serif;
			background-color: $primary-bg;
			color: $text-color;
		}

		body {
			line-height: 1.5;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}

		img,
		picture,
		video,
		canvas,
		svg {
			display: block;
			max-width: 100%;
		}

		input,
		button,
		textarea,
		select {
			font: inherit;
		}

		a {
			color: inherit;
			text-decoration: none;
		}

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}
	}

	footer {
		background-color: $secondary-bg;
	}
</style>
