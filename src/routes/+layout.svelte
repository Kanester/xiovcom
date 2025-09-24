<script lang="ts">
	import 'normalize.css';
	import '$styles';
	const { children } = $props();
</script>

<svelte:head>
	<title>XiövWrites — When knowledge meets creativity</title>
	<meta name="title" content="XiövWrites — When knowledge meets creativity" />
	<meta
		name="description"
		content="XiövWrites is where knowledge meets creativity — a space for curious minds to explore insightful articles, fresh ideas, and creative writing. From practical guides to thought-provoking stories, XiövWrites blends learning with imagination to inspire and inform readers everywhere."
	/>
	<meta
		name="keywords"
		content="xiovwrites, creativity, knowledge, inspiration, storytelling, writing, blogging, learning, growth, ideas, education, wisdom, imagination, articles"
	/>
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="author" content="Xiöv" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://xiovwrites.vercel.app/" />
	<meta property="og:title" content="XiövWrites — When knowledge meets creativity" />
	<meta
		property="og:description"
		content="XiövWrites is where knowledge meets creativity — a space for curious minds to explore insightful articles, fresh ideas, and creative writing. From practical guides to thought-provoking stories, XiövWrites blends learning with imagination to inspire and inform readers everywhere."
	/>
	<meta property="og:image" content="https://xiovwrites.vercel.app/openGraph.png" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://xiovwrites.vercel.app/" />
	<meta name="twitter:title" content="XiövWrites — When knowledge meets creativity" />
	<meta
		name="twitter:description"
		content="XiövWrites is where knowledge meets creativity — a space for curious minds to explore insightful articles, fresh ideas, and creative writing. From practical guides to thought-provoking stories, XiövWrites blends learning with imagination to inspire and inform readers everywhere."
	/>
	<meta name="twitter:image" content="https://xiovwrites.vercel.app/openGraph.png" />
</svelte:head>

<header>
	<nav>
		<div class="logo">
			<a href="/">
				<img height="48" width="48" src="/favicon.svg" alt="XiövWrites logo" />
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
	<p>
		Copyright &copy; 2025 <strong>XiövWrites</strong> — Made with &#10084;&#65039; &amp; curiosity.
	</p>
</footer>
