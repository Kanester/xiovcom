<script lang="ts">
import { loginWithGoogle, loginWithGithub, getCurrentUser } from '$lib/services/firebase';
	import { fade, scale } from 'svelte/transition';
	import { user } from '$stores/user';
	import '$styles/global.scss';

	let { children } = $props();
	let dropdownOpen = $state(false);
	let signInOpen = $state(false);

	const toggle = (target: 'dropdown' | 'signin') => {
		if (target === 'dropdown') dropdownOpen = !dropdownOpen;
		else if (target === 'signin') signInOpen = !signInOpen;
	};

	const closeModal = () => (signInOpen = false);
	const signOut = () => {
		user.set(null);
		dropdownOpen = false;
	};
	
	console.log(getCurrentUser())
</script>

<header>
	<div id="brand">
		<img src="/favicon.svg" alt="Xi&ouml;vWrites logo" width="32" height="32" />
		<span>Xi&ouml;vWrites</span>
	</div>

	{#if $user}
		<div id="profile">
			<button
				type="button"
				class="avatar-btn"
				onclick={() => toggle('dropdown')}
				aria-expanded={dropdownOpen}
				aria-controls="dropdown"
			>
				<img src={$user.avatar || '/default-avatar.svg'} alt="Profile avatar" class="avatar" />
			</button>

			{#if dropdownOpen}
				<div id="dropdown" role="menu" transition:fade>
					<p id="username">{$user.name}</p>
					<a href="/dashboard" role="menuitem">Dashboard</a>
					<button type="button" onclick={signOut} role="menuitem"> Sign Out </button>
				</div>
			{/if}
		</div>
	{:else}
		<button type="button" id="signin" onclick={() => toggle('signin')}> Sign In </button>
	{/if}
</header>

{#if signInOpen}
	<div
		id="authBackdrop"
		onclick={closeModal}
		onkeydown={(e) => (e.key === 'Escape' || e.key === 'Enter' ? closeModal() : null)}
		role="presentation"
		transition:fade
	>
		<div
			id="authModal"
			tabindex="0"
			role="dialog"
			aria-modal="true"
			onclick={(e) => e.stopPropagation()}
			transition:scale
		>
			<button type="button" class="close-btn" aria-label="Close" onclick={closeModal}>
				&times;
			</button>
			<h2>Continue to Xi&ouml;vWrites</h2>
			<div id="provider">
	<button onclick={loginWithGoogle} aria-label="Log in with Google">
		<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
	><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
		d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z"
	/></svg
>

		<span>Log in with Google</span>
	</button>
	<button onclick={loginWithGithub} aria-label="Log in with Github">
		<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
	><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
		d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z"
	/></svg
>

		<span>Log in with Github</span>
	</button>
			</div>
		</div>
	</div>
{/if}

{@render children?.()}

<style lang="scss">
@use 'sass:color';
@use '$styles/variables' as v;
@use "$styles/mixins" as *;

$button: #00ff7f;
$modal-bg: color.scale(v.$color-dark, $lightness: 4%);
$hover-bg: color.scale($button, $alpha: -0.85%);
$shadow: 0 6px 24px rgba(0, 0, 0, 0.5);

/* ==========================
   Layout & Header
========================== */
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
	color: v.$color-light;
	font-family: system-ui, sans-serif;

	#brand {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		img {
			border-radius: 6px;
		}
		span {
			font-weight: 600;
			font-size: 1.25rem;
		}
	}

	button {
		background: none;
		border: 1px solid $button;
		color: $button;
		padding: 0.45rem 1.1rem;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.25s ease;
		font-weight: 500;

		&:hover {
			text-shadow: 0 0 6px $button;
			background-color: $hover-bg;
			transform: translateY(-1px);
		}

		&:focus-visible {
			outline: 2px solid $button;
			outline-offset: 3px;
		}
	}
}

/* ==========================
   Profile & Dropdown
========================== */
#profile {
	position: relative;

	.avatar-btn {
		border: none;
		background: transparent;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		transition: transform 0.2s ease;

		&:hover {
			transform: scale(1.05);
		}
	}

	#dropdown {
		position: absolute;
		right: 0;
		margin-top: 0.5rem;
		background: #2a2a2a;
		border-radius: 8px;
		padding: 0.75rem 1rem;
		box-shadow: $shadow;
		min-width: 10rem;
		z-index: 10;

		#username {
			font-weight: 600;
			margin-bottom: 0.5rem;
		}

		a,
		button {
			display: block;
			width: 100%;
			text-align: left;
			color: v.$color-light;
			text-decoration: none;
			background: none;
			border: none;
			padding: 0.45rem 0;
			cursor: pointer;
			transition: color 0.15s ease;

			&:hover {
				color: #ffcc00;
			}
		}
	}
}

/* ==========================
   Auth Modal
========================== */
#authBackdrop {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.65);
	backdrop-filter: blur(6px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

#authModal {
	background: $modal-bg;
	color: v.$color-light;
	border-radius: 14px;
	padding: 2.25rem 2rem;
	box-shadow: $shadow;
	text-align: center;
	position: relative;
	width: min(90%, 400px);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	transition: transform 0.25s ease;

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		font-weight: 600;
		line-height: 1.3;
	}

	#provider {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		margin-top: 0.5rem;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.6rem;
			border: 1px solid $button;
			border-radius: 6px;
			padding: 0.7rem 1rem;
			background: none;
			color: $button;
			cursor: pointer;
			font-weight: 500;
			width: 100%;
			transition: all 0.25s ease;

			svg {
	@include icons(1.25em, v.$color-light);
			}

			&:hover {
				background: $hover-bg;
				text-shadow: 0 0 5px $button;
				transform: translateY(-1px);
			}

			&:focus-visible {
				outline: 2px solid $button;
				outline-offset: 3px;
			}
		}
	}

	.close-btn {
		position: absolute;
		top: 0.6rem;
		right: 0.8rem;
		background: none;
		border: none;
		color: v.$color-light;
		font-size: 1.5rem;
		cursor: pointer;
		line-height: 1;
		padding: 0.25rem;
		border-radius: 50%;
		transition:
			transform 0.25s ease,
			color 0.25s ease,
			background 0.25s ease;

		&:hover {
			transform: rotate(90deg);
			color: #ff5555;
			background: rgba(255, 255, 255, 0.1);
		}

		&:focus-visible {
			outline: 2px solid #ff5555;
			outline-offset: 3px;
		}
	}
}
</style>