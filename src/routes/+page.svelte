<script lang="ts">
	const { data } = $props();
	const { meta } = data;

	let text = $state('XiövCom');
	let hovering = $state(false);
	let isTyping = $state(false);

	const fullOne = 'XiövCom';
	const fullTwo = "Kiö's Workplace";

	let timeout: ReturnType<typeof setTimeout>;

	$effect(() => {
		clearTimeout(timeout);

		if (hovering && text !== fullTwo) {
			isTyping = true;
			animateText(text, fullTwo);
		} else if (!hovering && text !== fullOne) {
			isTyping = true;
			animateText(text, fullOne);
		} else {
			isTyping = false;
		}
	});

	function animateText(current: string, target: string) {
		if (current === target) {
			isTyping = false;
			return;
		}

		timeout = setTimeout(() => {
			let next = current;

			if (current.length > target.length || !target.startsWith(current)) {
				next = current.slice(0, -1);
			} else {
				next = target.slice(0, current.length + 1);
			}

			text = next;
			animateText(next, target);
		}, 60);
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.desc} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.desc} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.desc} />
</svelte:head>

<section>
	<h1 class="title" onmouseenter={() => (hovering = true)} onmouseleave={() => (hovering = false)}>
		<span class="text">{text}</span>
		<span class="cursor" class:blinking={isTyping}>|</span>
	</h1>

	<p>Hello and welcome, dear visitor! You're currently inside Kiö's workplace called XiövCom.
		This is where I — Kiö — dump my thoughts, tips, and learning resources as well my projects;
		whether experimental or released.
	</p>
	<p>Feel free to explore and learn through blogs that I made and will make!</p>
	<span class="ps"><strong>PS:</strong> I made this site with phone, so i dunno how this will it look at bigger screens! My previewer is not so reliable.</span>
	<div class="btn-wrap">
		<a href="/blog"><button>Blogs</button></a>
		<a href="/project"><button>Projects</button></a>
	</div>
</section>

<section>
	<h2>About Me</h2>
	<p>
		Hey, I'm Kiö — a senior high school student currently taking Accountancy and Business Management
		strand. But let’s be real, I spend most of my free time coding just for fun.
		I'm completely self-taught. I learn by watching YouTube tutorials, messing around with code, and
		reading documentation when I need answers.
	</p>
	<p>
		I like building experimental stuff — random ideas that pop into my head. Though, I dream of
		creating something meaningful that could actually help people someday.
		Outside of coding, I’m into JPop and indie-pop music. I also write stories and poems when I’m in
		the mood for something more chill and creative.
	</p>
	<p>
		As for CSS and design? Yeah... not my strong suit. I know, even this site's design doesn't
		satisfy me.
	</p>
</section>

<section>
	<h2>My status as developer</h2>
	<article class="card-wrap">
		<div class="card">
			<h3>Tech Stack</h3>
			<ul>
				<li>Svelte/SvelteKit</li>
				<li>Typescript/Javascript</li>
				<li>SupaBase</li>
				<li>Vercel</li>
			</ul>
		</div>
		<div class="card">
			<h3>Toolsets</h3>
			<ul>
				<li>My clackky phone</li>
				<li>Acode Mobile Editor</li>
				<li>Termux</li>
				<li>Git</li>
			</ul>
		</div>
		<div class="card">
			<h3>Currently learning</h3>
			<ul>
				<li>GoLang</li>
			</ul>
		</div>
	</article>
</section>


<style lang="scss">
	@use 'sass:color';
	@use '$styles/variables' as *;
	
	.ps {
		color: rgba($text-color, 0.75);
		font-size: clamp(0.5rem, 0.75rem, 1rem);
		
		strong {
			color: $text-color;
		}
	}

	.title {
		font-family: 'Mogra', system-ui;
		font-weight: 400;
		font-style: normal;
		font-size: clamp(2rem, 2.5rem, 3rem);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin: 0 auto 1.5rem;
		white-space: nowrap;

		.text {
			display: inline-block;
		}

		.cursor {
			display: inline-block;
			width: 1ch;
			color: currentColor;
			opacity: 0;
		}

		.cursor.blinking {
			opacity: 1;
			animation: blink 1s steps(2, start) infinite;
		}
	}

	h2 {
		color: $accent-blue;
		font-size: clamp(1.3rem, 1.1vw + 1rem, 1.75rem);
		margin-bottom: 1rem;
	}

.btn-wrap {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	margin-top: 1.5rem;

	a {
		text-decoration: none;
		
			button {
		width: 100%;
		padding: 0.75rem 1.25rem;
		font-size: 1rem;
		background-color: $accent-blue;
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.2s ease;

		&:hover {
			background-color: color.adjust($accent-blue, $lightness: 5%);
		}
	}
	}
	
		a:first-of-type button {
			background-color: rgba($accent-green, 0.7);
			&:hover {
		background-color: color.adjust(rgba($accent-green, 0.7), $lightness: 5%);}
	}

	@media (min-width: 600px) {
		flex-direction: row;

		button {
			width: auto;
			min-width: 120px;
		}
	}
}

	.card-wrap {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-top: 1.5rem;

		@media (min-width: 600px) {
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}

	.card {
		background: #1a1a1a;
		padding: 1.5rem;
		border-radius: 0.75rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
		color: $text-color;
		transition: transform 0.2s ease;
		border: 1px solid rgba(255, 255, 255, 0.05);
		width: 100%;
		box-sizing: border-box;

		&:hover {
			transform: translateY(-3px);
			box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
		}

		h3 {
			color: $accent-blue;
			margin-bottom: 0.75rem;
			font-size: clamp(1.1rem, 0.9vw + 0.8rem, 1.3rem);
		}

		ul {
			list-style: disc;
			margin-left: 1.2rem;
			padding-left: 0;

			li {
				font-size: clamp(0.9rem, 0.8vw + 0.75rem, 1rem);
				line-height: 1.6;
			}
		}

		@media (min-width: 600px) {
			width: calc(33% - 0.85rem);
		}
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>