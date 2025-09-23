<section class="hero">
	<h1>WHEN KNOWLEDGE, MEETS CREATIVITY</h1>
	<p>XiövWrites blends learning with imagination to inspire and inform readers everywhere</p>
	<a href="#truth">START HERE</a>
</section>

<section class="container" id="truth">
	<h1>HARD TRUTH</h1>
	<p>You <span>CAN'T</span> learn just by watching or listening to tutorials</p>
	<a href="#solution">We've all been there &#x1F972;</a>
</section>

<section class="container" id="solution">
	<h1>Solution</h1>
	<p>
		XiövWrites is all about <span>PROJECT-BASED</span> learning. Short videos + blogs help you apply
		what you learn, step by step.
	</p>
	<a href="#fun">See how it works &#x1F440;</a>
</section>

<section class="container" id="fun">
	<h1>HAVE FUN</h1>
	<p>
		Have fun while learning! <span>EARN</span> badges, track your progress, and celebrate small wins.
	</p>
	<a href="#go">Level up! &#x1F31F;</a>
</section>

<section class="container" id="go">
	<h1>LET'S GO</h1>
	<p><span>EXPLORE</span> tons of free content and start learning at your own pace.</p>
	<a href="#">Start exploring &#x1F680;</a>
</section>

<style lang="scss">
	.hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: clamp(2rem, 5vw, 4rem) 1rem;
		font-weight: 400;

		h1 {
			font-size: clamp(2rem, 5vw, 3rem);
			margin-bottom: clamp(1rem, 2vw, 2rem);
		}

		p {
			font-size: clamp(1.1rem, 2vw, 1.4rem);
			line-height: 1.5rem;
			margin-bottom: clamp(1.3rem, 2.5vw, 1.8rem);
			max-width: 700px;
		}

		a {
			padding: clamp(0.6rem, 1vw, 0.8rem) clamp(1.5rem, 3vw, 2rem);
			background: #ff6f61;
			color: #fff;
			text-decoration: none;
			border-radius: 8px;
			font-weight: 500;
			transition: all 0.3s ease;

			&:hover {
				background: #ff4b3c;
				transform: scale(1.05);
			}
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: clamp(4rem, 8vw, 6rem) 1rem;
		font-family: 'Poppins', sans-serif;

		h1 {
			font-size: clamp(2rem, 5vw, 3rem);
			margin-bottom: clamp(1rem, 2vw, 2rem);
			text-transform: uppercase;
			letter-spacing: 1.5px;
			padding: 0.7rem 1.5rem;
			border-radius: 12px;
			color: #fff;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		}

		p {
			font-size: clamp(1.6rem, 4vw, 2rem);
			line-height: 2.2rem;
			max-width: 700px;
			margin-bottom: clamp(2rem, 4vw, 3rem);
			font-weight: 500;
			letter-spacing: 0.5px;
			color: #333;
			text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

			span {
				font-weight: 700;
				font-size: 1.15em;
			}
		}

		a {
			text-decoration: none;
			border-radius: 8px;
			font-weight: 600;
			padding: 0.7rem 1.8rem;
			transition: all 0.3s ease;
			font-size: clamp(1rem, 2.5vw, 1.2rem);
			letter-spacing: 0.5px;
			color: #fff;

			&:hover {
				transform: scale(1.08);
			}
		}
	}

	#truth {
		h1 {
			background: #009688;
		}
		span {
			color: #009688;
		}
	}

	#solution {
		h1 {
			background: #ff9800;
		}
		span {
			color: #ff9800;
		}
	}

	#fun {
		h1 {
			background: #9c27b0;
		}
		span {
			color: #9c27b0;
		}
	}

	#go {
		h1 {
			background: #2196f3;
		}
		span {
			color: #2196f3;
		}
	}
</style>
