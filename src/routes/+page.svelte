<main>
	<section class="container" id="hero">
		<h1>When Knowledge Meets Creativity</h1>
		<p>
			Xi&ouml;vWrites blends learning with imagination to inspire and inform readers everywhere.
		</p>
		<a href="#truth" aria-label="Start here and go to the Hard Truth section">START HERE</a>
	</section>

	<section class="container" id="truth" aria-labelledby="truth-heading">
		<h2 id="truth-heading">Hard Truth</h2>
		<p>You <span>CAN&apos;T</span> learn just by watching or listening to tutorials.</p>
		<a href="#solution" aria-label="Continue to the Solution section"
			>We&apos;ve all been there &#128558;&#8205;&#128168;</a
		>
	</section>

	<section class="container" id="solution" aria-labelledby="solution-heading">
		<h2 id="solution-heading">Solution</h2>
		<p>
			Xi&ouml;vWrites is all about <span>PROJECT-BASED</span> learning. Short videos + blogs help you
			apply what you learn, step by step.
		</p>
		<a href="#fun" aria-label="Continue to the Have Fun section">See how it works &#128064;</a>
	</section>

	<section class="container" id="fun" aria-labelledby="fun-heading">
		<h2 id="fun-heading">Have Fun</h2>
		<p>
			Have fun while learning! <span>EARN</span> badges, track your progress, and celebrate small wins.
		</p>
		<a href="#go" aria-label="Continue to the Let&apos;s Go section">Level up! &#127775;</a>
	</section>

	<section class="container" id="go" aria-labelledby="go-heading">
		<h2 id="go-heading">Let&apos;s Go</h2>
		<p><span>EXPLORE</span> tons of free content and start learning at your own pace.</p>
		<a href="#signin" aria-label="Return to the top section">Start Exploring! &#128640;</a>
	</section>
</main>

<footer>
	<span>
		&copy; 2025 <strong>Xi&ouml;vWrites</strong> &mdash; Made with &hearts; &amp; curiosity.
	</span>
</footer>

<style lang="scss">
	@use '$styles/mixins' as *;

	$sections: (
		hero: #ff6f61,
		truth: #009688,
		solution: #ff9800,
		fun: #9c27b0,
		go: #2196f3
	);

	.container {
		@include container;
		text-align: center;

		h1,
		h2 {
			@include heading;
			margin-bottom: 1rem;
		}

		p {
			margin-bottom: 1.5rem;
			font-size: 1.1rem;
			line-height: 1.6;
		}

		a {
			display: inline-block;
			text-decoration: none;
			font-weight: 600;
			margin-top: 1rem;
		}

		span {
			font-weight: 700;
		}
	}

	@each $id, $color in $sections {
		##{$id} {
			a {
				@include button-base($color, $color);
			}

			span {
				color: $color;
			}
		}
	}

	footer {
		text-align: center;
		padding: 1.5rem 0;
		font-size: 0.9rem;
		color: #aaa;
	}
</style>
