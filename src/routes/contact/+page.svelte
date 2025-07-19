<script lang="ts">
	const { data } = $props();
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
