<script lang="ts">
	import '$styles/global.scss';
	import { fade, slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { tick } from 'svelte';
	import { auth, loginWithGoogle, loginWithGithub, logout } from '$lib/services/firebase/auth';
	import { onAuthStateChanged, type User } from 'firebase/auth';

	/* -------------------------
	   local reactive state (modern style)
	   ------------------------- */
	let { children } = $props();

	let dropdownOpen = $state(false);
	let signInOpen = $state(false);
	let loading = $state(true);
	let isAuthing = $state(false); // prevents double-clicks during provider login
	let currentUser: User | null = $state(null);

	/* -------------------------
	   helper: derive initials for fallback avatar
	   ------------------------- */
	const getInitials = (user: User | null) => {
		if (!user) return '';
		const name = user.displayName ?? user.email ?? '';
		const parts = name.trim().split(/\s+/);
		if (parts.length === 0) return '';
		if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	};

	/* -------------------------
	   auth listener + /app protection
	   ------------------------- */
	$effect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			currentUser = user;
			loading = false;

			// ensure Svelte DOM updates before we redirect
			await tick();

			const path = $page.url.pathname;

			// Protect /app routes: redirect to root if not authenticated
			if (!user && path.startsWith('/app')) {
				goto('/');
			}

			// If user logs in while on root, send them to /app
			if (user && !path.startsWith('/app')) {
				goto('/app');
			}
		});

		return () => unsubscribe();
	});

	/* -------------------------
	   sign-in helpers
	   ------------------------- */
	const openSignIn = () => {
		signInOpen = true;
	};

	const closeModal = () => {
		signInOpen = false;
		isAuthing = false;
	};

	// wrapper to avoid double clicks and to close modal after login
	const handleProviderLogin = async (provider: 'google' | 'github') => {
		if (isAuthing) return;
		isAuthing = true;

		try {
			if (provider === 'google') await loginWithGoogle();
			else await loginWithGithub();

			// successful sign-in will trigger onAuthStateChanged -> redirects as needed
			closeModal();
		} catch (err) {
			console.error('[layout] provider login error:', err);
		} finally {
			isAuthing = false;
		}
	};

	const toggle = (which: 'dropdown' | 'signin') => {
		if (which === 'dropdown') dropdownOpen = !dropdownOpen;
		else signInOpen = !signInOpen;
	};

	const signOut = async () => {
		try {
			await logout();
			currentUser = null;
			dropdownOpen = false;
			goto('/');
		} catch (err) {
			console.error('[layout] signOut error:', err);
		}
	};

	/* -------------------------
	   Focus trap for modal + Escape handling
	   ------------------------- */
	$effect(() => {
		if (!signInOpen) return;

		const modal = document.getElementById('authModal');
		if (!modal) return;

		// move focus to first focusable element
		const focusable = modal.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		const first = focusable[0] ?? modal;
		first.focus();

		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				closeModal();
			}

			// simple tab loop
			if (e.key === 'Tab') {
				const nodes = Array.from(focusable).filter((el) => !el.hasAttribute('disabled'));
				if (nodes.length === 0) return;

				const idx = nodes.indexOf(document.activeElement as HTMLElement);
				if (e.shiftKey) {
					// shift+tab
					if (idx === 0) {
						e.preventDefault();
						(nodes[nodes.length - 1] as HTMLElement).focus();
					}
				} else {
					// tab
					if (idx === nodes.length - 1) {
						e.preventDefault();
						(nodes[0] as HTMLElement).focus();
					}
				}
			}
		};

		document.addEventListener('keydown', handleKey);
		return () => document.removeEventListener('keydown', handleKey);
	});
</script>

{#if loading}
	<div class="loading-screen" transition:fade={{ duration: 200 }}>
		<div class="spinner" />
		<p>Loading XiövWrites…</p>
	</div>
{:else}
	<header class="header" transition:fade={{ duration: 160 }}>
		<div id="brand" onclick={() => goto('/')} class="brand" transition:fade>
			<img src="/favicon.svg" alt="XiövWrites logo" width="32" height="32" />
			<span>XiövWrites</span>
		</div>

		{#if currentUser}
			<div id="profile" class="profile" transition:fade>
				<button
					class="avatar-btn"
					onclick={() => toggle('dropdown')}
					aria-expanded={dropdownOpen}
					aria-controls="dropdown"
				>
					{#if currentUser.photoURL}
						<img src={currentUser.photoURL} alt="User avatar" class="avatar" />
					{:else}
						<span class="avatar-initials">{getInitials(currentUser)}</span>
					{/if}
				</button>

				{#if dropdownOpen}
					<div id="dropdown" role="menu" transition:slide={{ duration: 180 }}>
						<p id="username">{currentUser.displayName ?? currentUser.email ?? 'Anonymous'}</p>
						<a href="/app" role="menuitem">Dashboard</a>
						<button type="button" onclick={signOut} role="menuitem">Sign Out</button>
					</div>
				{/if}
			</div>
		{:else}
			<button id="signin" onclick={openSignIn} transition:fade disabled={isAuthing}>Sign In</button>
		{/if}
	</header>

	{#if signInOpen}
		<div
			id="authBackdrop"
			onclick={closeModal}
			role="presentation"
			transition:fade={{ duration: 150 }}
		>
			<div
				id="authModal"
				tabindex="0"
				role="dialog"
				aria-modal="true"
				onclick={(e) => e.stopPropagation()}
				transition:slide={{ y: 16, duration: 200 }}
			>
				<button type="button" class="close-btn" aria-label="Close" onclick={closeModal}>
					&times;
				</button>

				<h2>Continue to XiövWrites</h2>

				<div id="provider">
					<button
						onclick={() => handleProviderLogin('google')}
						aria-label="Log in with Google"
						disabled={isAuthing}
					>
						<svg
							height="24"
							width="24"
							viewBox="0 0 640 640"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								fill="currentColor"
								d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z"
							/>
						</svg>
						<span>Log in with Google</span>
					</button>

					<button
						onclick={() => handleProviderLogin('github')}
						aria-label="Log in with GitHub"
						disabled={isAuthing}
					>
						<svg
							height="24"
							width="24"
							viewBox="0 0 640 640"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								fill="currentColor"
								d="M316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72z"
							/>
						</svg>
						<span>Log in with GitHub</span>
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- render app children with a gentle fade to avoid popping -->
	<div class="children-wrap" transition:fade>
		{@render children()}
	</div>
{/if}

<style lang="scss">
	@use 'sass:color';
	@use '$styles/variables' as *;
	@use '$styles/mixins' as *;

	$button: #00ff7f;
	$modal-bg: color.scale($color-dark, $lightness: 4%);
	$hover-bg: color.scale($button, $alpha: -0.85%);
	$shadow: 0 10px 30px rgba(0, 0, 0, 0.6);

	/* === Loading Screen === */
	.loading-screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background: #0f0f0f;
		color: $button;
		font-family: system-ui, sans-serif;
		gap: 1rem;
		p {
			font-weight: 600;
			font-size: 1.05rem;
			animation: pulse 1.2s infinite alternate;
		}
		.spinner {
			width: 2.25rem;
			height: 2.25rem;
			border: 3px solid rgba(0, 255, 127, 0.14);
			border-top-color: $button;
			border-radius: 50%;
			animation: spin 0.8s linear infinite;
			box-shadow: 0 0 12px rgba(0, 255, 127, 0.06);
		}
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes pulse {
		from {
			opacity: 0.75;
			transform: translateY(0);
		}
		to {
			opacity: 1;
			transform: translateY(-2px);
		}
	}

	/* === Header === */
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.9rem 1.25rem;
		color: $color-light;
		backdrop-filter: blur(6px);

		.brand {
			display: flex;
			align-items: center;
			gap: 0.6rem;
			cursor: pointer;
			transition:
				transform 0.18s ease,
				text-shadow 0.18s ease;
			span {
				font-weight: 600;
				font-size: 1.15rem;
			}

			&:hover {
				transform: scale(1.03);
				text-shadow: 0 0 8px $button;
			}
		}

		button {
			background: none;
			border: 1px solid $button;
			color: $button;
			padding: 0.45rem 0.95rem;
			border-radius: 8px;
			cursor: pointer;
			transition: all 0.22s cubic-bezier(0.2, 0.9, 0.2, 1);
			font-weight: 600;
			letter-spacing: 0.2px;
			font-size: 0.95rem;

			&:hover:not(:disabled) {
				text-shadow: 0 0 6px $button;
				background-color: $hover-bg;
				transform: translateY(-2px) scale(1.01);
			}
			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}
	}

	/* === Dropdown === */
	.profile {
		position: relative;

		.avatar-btn {
			border: none;
			background: transparent;
			padding: 0;
			cursor: pointer;
			width: 40px;
			height: 40px;
			display: grid;
			place-items: center;
			border-radius: 50%;
			transition: transform 0.16s ease;
			&:hover {
				transform: scale(1.06);
			}
		}

		.avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			object-fit: cover;
			display: block;
		}

		.avatar-initials {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			display: inline-grid;
			place-items: center;
			background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
			border: 1px solid rgba(255, 255, 255, 0.04);
			color: $button;
			font-weight: 700;
			letter-spacing: 0.6px;
		}

		#dropdown {
			position: absolute;
			right: 0;
			margin-top: 0.6rem;
			background: #1f1f1f;
			border-radius: 10px;
			padding: 0.75rem;
			box-shadow: $shadow;
			min-width: 12rem;
			z-index: 30;

			#username {
				font-weight: 700;
				margin-bottom: 0.5rem;
				color: $color-light;
			}

			a,
			button {
				display: block;
				width: 100%;
				text-align: left;
				color: $color-light;
				background: none;
				border: none;
				padding: 0.5rem;
				cursor: pointer;
				border-radius: 6px;
				transition: all 0.14s ease;
				font-weight: 600;
				font-size: 0.95rem;

				&:hover {
					color: #222;
					background: rgba(255, 204, 0, 0.95);
					transform: translateX(4px);
				}
			}
		}
	}

	/* === Modal / Auth Popup === */
	#authBackdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(6px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1.25rem;
	}

	#authModal {
		background: $modal-bg;
		color: $color-light;
		border-radius: 14px;
		padding: 2rem;
		box-shadow: $shadow;
		text-align: center;
		width: min(92%, 420px);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		position: relative;
		outline: none;

		h2 {
			font-size: 1.25rem;
			margin-bottom: 0.2rem;
			font-weight: 700;
		}

		#provider {
			display: flex;
			flex-direction: column;
			gap: 0.7rem;
			width: 100%;

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.75rem;
				border: 1px solid $button;
				border-radius: 8px;
				padding: 0.65rem 0.85rem;
				background: none;
				color: $button;
				cursor: pointer;
				font-weight: 700;
				transition:
					transform 0.14s ease,
					box-shadow 0.14s ease;
				width: 100%;

				svg {
					opacity: 0.95;
				}

				&:hover:not(:disabled) {
					transform: translateY(-3px);
					box-shadow: 0 6px 18px rgba(0, 255, 127, 0.06);
					background: $hover-bg;
				}

				&:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}
			}

			/* subtle brand hover highlights */
			button:first-child:hover {
				background: rgba(219, 68, 55, 0.06);
			}
			button:last-child:hover {
				background: rgba(36, 41, 46, 0.06);
			}
		}

		.close-btn {
			position: absolute;
			top: 0.6rem;
			right: 0.8rem;
			background: none;
			border: none;
			color: $color-light;
			font-size: 1.35rem;
			cursor: pointer;
			line-height: 1;
			padding: 0.25rem;
			border-radius: 50%;
			transition:
				transform 0.18s ease,
				color 0.18s ease;
			&:hover {
				transform: rotate(90deg);
				color: #ff6b6b;
			}
		}
	}

	/* === children wrapper === */
	.children-wrap {
		min-height: calc(100vh - 64px);
		padding: 1rem;
		transition: opacity 180ms ease;
	}

	/* small responsive */
	@media (max-width: 560px) {
		.header {
			padding: 0.7rem 1rem;
		}
		.brand span {
			font-size: 1rem;
		}
		.profile .avatar,
		.avatar-initials {
			width: 36px;
			height: 36px;
		}
		#authModal {
			width: min(96%, 360px);
			padding: 1.25rem;
		}
	}
</style>
