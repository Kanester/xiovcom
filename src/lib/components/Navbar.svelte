<script lang="ts">
	let navOpen = $state(false);
	let navHeight = $state(0);
	let navRef: HTMLUListElement;

	$effect(() => {
		if (navRef) {
			navHeight = navOpen ? navRef.scrollHeight : 0;
		}
	});
</script>

<nav class:open={navOpen}>
	<div class="nav-brand">
		<h1>XiövCom</h1>
		<button class="hamburger" on:click={() => (navOpen = !navOpen)}>&#9776;</button>
	</div>

	<ul
		class="nav-links"
		bind:this={navRef}
		style:height={`${navHeight}px`}
	>
		<li><a href="/">Home</a></li>
		<li><a href="/blog">Blog</a></li>
		<li><a href="/project">Project</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>

<style lang="scss">
@use '$styles/variables' as *;

nav {
	position: sticky;
	top: 0;
	z-index: 1000;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0.75rem 1.5rem;
	background-color: rgba($primary-bg, 0.75);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border-bottom: 1px solid rgba($text-color, 0.05);
	color: $text-color;
	box-shadow:
		0 1px 2px rgba(255, 255, 255, 0.03) inset,
		0 1px 6px rgba(0, 0, 0, 0.2),
		0 4px 12px rgba(0, 0, 0, 0.15);

	.nav-brand {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h1 {
			font-size: 1.25rem;
			margin: 0;
			color: $accent-blue;
			text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
		}

		.hamburger {
			display: block;
			background: none;
			border: none;
			color: $text-color;
			font-size: 1.5rem;
			cursor: pointer;
			transition: color 0.2s ease;

			&:hover {
				color: $accent-red;
			}
		}
	}

	.nav-links {
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		list-style: none;
		padding: 0;
		margin-top: 0.75rem;
		gap: 0.4rem;

		transition: height 0.35s ease;

		li {
			width: 100%;

			a {
				display: block;
				width: 100%;
				padding: 0.5rem 0;
				color: $text-color;
				text-decoration: none;
				font-weight: 500;
				position: relative;
				transition: color 0.2s ease;

				&:hover {
					color: $accent-green;
				}

				&::after {
					content: '';
					position: absolute;
					left: 0;
					bottom: -2px;
					width: 100%;
					height: 2px;
					background: $accent-green;
					transform: scaleX(0);
					transform-origin: left;
					transition: transform 0.3s ease;
				}

				&:hover::after {
					transform: scaleX(1);
				}
			}
		}
	}
}

@media (min-width: 768px) {
	nav {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.nav-links {
			height: auto !important;
			overflow: visible;
			flex-direction: row;
			margin-top: 0;
			gap: 0;

			li {
				width: auto;

				a {
					padding: 0.5rem 1rem;
				}
			}
		}

		.nav-brand .hamburger {
			display: none;
		}
	}
}
</style>