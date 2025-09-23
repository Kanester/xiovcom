<script lang="ts">
	import "normalize.css";
	const { children } = $props();
</script>

<svelte:head>
	<title>XiövWrites — When knowledge meets creativity</title>
	<meta name="title" content="XiövWrites — When knowledge meets creativity">
	<meta name="description" content="XiövWrites is where knowledge meets creativity — a space for curious minds to explore insightful articles, fresh ideas, and creative writing. From practical guides to thought-provoking stories, XiövWrites blends learning with imagination to inspire and inform readers everywhere.">
	<meta name="keywords" content="xiovwrites, creativity, knowledge, inspiration, storytelling, writing, blogging, learning, growth, ideas, education, wisdom, imagination, articles">
	<meta name="robots" content="index, follow">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="language" content="English">
	<meta name="author" content="Xiöv">

	<meta name="color-scheme" content="dark">
	<meta name="theme-color" content="#121212">
	
	<meta name="google-adsense-account" content="ca-pub-5629465522785733">
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-6PHHZXKKC3"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-6PHHZXKKC3');
	</script>

	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="XiövWrites" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<header>
	<nav>
		<div class="logo">
			<a href="/">
				<img height="48" width="48" src="/favicon.svg" alt="logo.svg" />
				<span class="brand">XiövWrites</span>
			</a>
		</div>
		<div class="links">
			<a href="/labs">Labs</a>
			<a href="/courses">Courses</a>
		</div>
	</nav>
</header>

<main>
	{@render children?.()}
</main>

<footer>
	<p>Copyright &copy; 2025 <strong>XiövWrites</strong> — Made with ❤️ & curiosity.</p>
</footer>

<style>
	:global(body) {
		background: #121212;
		color: #f1f1f1;
		font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
		margin: 0;
		line-height: 1.6;
	}

	header {
		border-bottom: 1px solid #222;
		padding: 0.5rem 1rem;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 900px;
		margin: 0 auto;
	}

	.logo a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		color: inherit;
		font-weight: 600;
	}

	.brand {
		font-size: 1.25rem;
	}

	.links {
		display: flex;
		gap: 1.5rem;
	}

	.links a {
		text-decoration: none;
		color: #ccc;
		font-weight: 500;
		position: relative;
	}

	.links a::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: -4px;
		width: 0%;
		height: 2px;
		background: #fff;
		transition: width 0.2s ease-in-out;
	}

	.links a:hover::after {
		width: 100%;
	}

	main {
		max-width: 900px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	footer {
		border-top: 1px solid #222;
		text-align: center;
		padding: 1rem;
		font-size: 0.9rem;
		color: #aaa;
	}

	@media (max-width: 600px) {
		.links {
			gap: 1rem;
		}
		.brand {
			display: none;
		}
	}
</style>