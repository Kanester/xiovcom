<script lang="ts">
	import AuthModal from '$assets/interface/forms/AuthModal.svelte';
	import { showAuthModal } from '$stores/auth';
	import { user } from '$stores/user';
</script>

<header>
	<h1>XiövWrites</h1>
	<button
		on:click={() => {
			showAuthModal.set(true);
		}}>Sign In</button
	>
</header>

<AuthModal />

<section class="hero">
	<h1>When Knowledge Meets Creativity</h1>
	<p>XiövWrites blends learning with imagination to inspire and inform readers everywhere.</p>
	<a href="#truth" aria-label="Start here and go to the Hard Truth section">START HERE</a>
</section>

<section class="container" id="truth" aria-labelledby="truth-heading">
	<h2 id="truth-heading">Hard Truth</h2>
	<p>You <span>CAN'T</span> learn just by watching or listening to tutorials.</p>
	<a href="#solution" aria-label="Continue to the Solution section">
		We've all been there &#128558;&#8205;&#128168;
	</a>
</section>

<section class="container" id="solution" aria-labelledby="solution-heading">
	<h2 id="solution-heading">Solution</h2>
	<p>
		XiövWrites is all about <span>PROJECT-BASED</span> learning. Short videos + blogs help you apply
		what you learn, step by step.
	</p>
	<a href="#fun" aria-label="Continue to the Have Fun section">See how it works &#128064;</a>
</section>

<section class="container" id="fun" aria-labelledby="fun-heading">
	<h2 id="fun-heading">Have Fun</h2>
	<p>
		Have fun while learning! <span>EARN</span> badges, track your progress, and celebrate small wins.
	</p>
	<a href="#go" aria-label="Continue to the Let's Go section">Level up! &#127775;</a>
</section>

<section class="container" id="go" aria-labelledby="go-heading">
	<h2 id="go-heading">Let's Go</h2>
	<p>
		<span>EXPLORE</span> tons of free content and start learning at your own pace.
	</p>

	{#if $user}
		<a href="/app" aria-label="Go to your dashboard">Go to Dashboard &#128640;</a>
	{:else}
		<a
			href="#"
			on:click|preventDefault={() => showAuthModal.set(true)}
			aria-label="Start exploring free content"
		>
			Start exploring &#128640;
		</a>
	{/if}
</section>

<footer>
	<p>
		Copyright &copy; 2025 <strong>XiövWrites</strong> — Made with &#10084;&#65039; &amp; curiosity.
	</p>
</footer>
