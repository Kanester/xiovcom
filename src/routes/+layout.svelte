<script lang="ts">
	import Kofi from '$component/Kofi.svelte';
	import Navbar from '$component/Navbar.svelte';
	import "normalize.css";
	import "$styles/base.scss";
	const { children, data } = $props();
	const { meta } = data;
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.desc} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.desc} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.desc} />
</svelte:head>

<Navbar />

<main>
	{@render children()}
</main>

<footer>
	<strong>&copy; Kiöv — All rights reserved.</strong>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/blog">Blog</a></li>
		<li><a href="/projects">Projects</a></li>
	</ul>
	<Kofi />
</footer>
