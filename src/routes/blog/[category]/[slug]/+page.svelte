<script lang="ts">
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
	const { component, post } = data;
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.description} />
</svelte:head>

<main>
	{@render component()}
</main>
