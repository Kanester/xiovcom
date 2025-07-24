<script lang="ts">
	const { data } = $props();
	const { posts, meta } = data;
	const grouped = Object.groupBy(posts, (post) => post.category);
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.desc} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.desc} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.desc} />
</svelte:head>

<h1>Blog</h1>
<h3>What a rainy </h3>


{#each Object.entries(grouped) as [category, groupedPosts]}
	<strong>{category}</strong>
	<ul>
		{#each groupedPosts as post}
			<li>
				<a href={`/blog/${post.category}/${post.slug}`}>{post.title}</a>
			</li>
		{/each}
	</ul>
{/each}
