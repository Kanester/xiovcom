<script lang="ts">
	let navOpen = false;
</script>

<nav class:open={navOpen}>
	<div class="nav-brand">
		<h1>XiövCom</h1>
		<button class="hamburger" on:click={() => (navOpen = !navOpen)}> &#9776; </button>
	</div>

	<ul class="nav-links">
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

		background-color: rgba($primary-bg, 0.75);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);

		color: $text-color;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 0.75rem 1.5rem;
		width: 100%;

		border-bottom: 1px solid rgba($text-color, 0.05);
		box-shadow:
			0 1px 2px rgba(255, 255, 255, 0.03) inset,
			0 1px 6px rgba(0, 0, 0, 0.2),
			0 4px 12px rgba(0, 0, 0, 0.15);

		transition:
			box-shadow 0.3s ease,
			backdrop-filter 0.3s ease,
			background-color 0.3s ease;

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
			display: none;
			flex-direction: column;
			gap: 0.4rem;
			margin-top: 0.75rem;
			list-style: none;
			padding: 0;

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

		&.open .nav-links {
			display: flex;
		}
	}

	@media (min-width: 768px) {
		nav {
			position: relative;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.nav-links {
				display: flex !important;
				flex-direction: row;
				margin-top: 0;
				justify-content: flex-end;

				li {
					width: auto;

					a {
						padding: 0.5rem 1rem;
					}
				}
			}

			.nav-brand {
				.hamburger {
					display: none !important;
				}
			}
		}
	}
</style>
