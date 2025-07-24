<script lang="ts">
	let open = $state(false);
	let height = $state(0);
	let links: HTMLUListElement;

	$effect(() => {
		if (links) height = open ? links.scrollHeight : 0
	});
</script>

<nav>
	<div class="nav-inner">
		<h1>XiövCom</h1>
		<button on:click={() => (open = !open)}>&#9776;</button>
	</div>

	<div class="nav-dropdown" style:height={height + 'px'}>
		<ul bind:this={links}>
			<li><a href="/">Home</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/project">Project</a></li>
		</ul>
	</div>
</nav>

<style lang="scss">
	@forward "$styles/navbar";
</style>