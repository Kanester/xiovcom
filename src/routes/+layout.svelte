<script lang="ts">
	import "$styles/global.scss";
	import { fade, slide } from "svelte/transition";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { tick } from "svelte";
	import {
		auth,
		loginWithGoogle,
		loginWithGithub,
		logout
	} from "$lib/services/firebase/auth";
	import { onAuthStateChanged, type User } from "firebase/auth";

	let { children } = $props();

	let dropdownOpen = $state(false);
	let signInOpen = $state(false);
	let loading = $state(true);
	let currentUser: User | null = $state(null);

	$effect(() => {
		console.log("[layout] Initializing auth listener…");

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			console.log("[layout] Auth state:", user);
			currentUser = user;
			loading = false;

			await tick();

			const path = $page.url.pathname;
			if (user && !path.startsWith("/app")) {
				console.log("[layout] Redirecting → /app");
				goto("/app");
			}
			if (!user && path.startsWith("/app")) {
				console.log("[layout] No user, redirecting → /");
				goto("/");
			}
		});

		return () => {
			unsubscribe();
			console.log("[layout] Auth listener removed");
		};
	});

	const toggle = (which: "dropdown" | "signin") => {
		if (which === "dropdown") dropdownOpen = !dropdownOpen;
		else signInOpen = !signInOpen;
	};

	const closeModal = () => (signInOpen = false);

	const signOut = async () => {
		try {
			await logout();
			currentUser = null;
			dropdownOpen = false;
			goto("/");
			console.log("[layout] Signed out → /");
		} catch (err) {
			console.error("[layout] signOut error:", err);
		}
	};
</script>

{#if loading}
	<div class="loading-screen" transition:fade={{ duration: 200 }}>
		<div class="spinner" />
		<p>Loading XiövWrites…</p>
	</div>
{:else}
	<header class="header">
		<div id="brand" onclick={() => goto("/")} class="brand" transition:fade>
			<img src="/favicon.svg" alt="XiövWrites logo" width="32" height="32" />
			<span>XiövWrites</span>
		</div>

		{#if currentUser}
			<div id="profile" class="profile" transition:fade>
				<button
					class="avatar-btn"
					onclick={() => toggle("dropdown")}
					aria-expanded={dropdownOpen}
					aria-controls="dropdown"
				>
					<img src={currentUser.photoURL ?? "/default-avatar.svg"} alt="User avatar" class="avatar" />
				</button>

				{#if dropdownOpen}
					<div id="dropdown" role="menu" transition:slide={{ duration: 180 }}>
						<p id="username">{currentUser.displayName}</p>
						<a href="/app" role="menuitem">Dashboard</a>
						<button type="button" onclick={signOut} role="menuitem">Sign Out</button>
					</div>
				{/if}
			</div>
		{:else}
			<button id="signin" onclick={() => toggle("signin")} transition:fade>Sign In</button>
		{/if}
	</header>

	{#if signInOpen}
		<div
			id="authBackdrop"
			onclick={closeModal}
			onkeydown={(e) => (e.key === "Escape" || e.key === "Enter") && closeModal()}
			role="presentation"
			transition:fade={{ duration: 150 }}
		>
			<div
				id="authModal"
				tabindex="0"
				role="dialog"
				aria-modal="true"
				onclick={(e) => e.stopPropagation()}
				transition:slide={{ y: 20, duration: 200 }}
			>
				<button type="button" class="close-btn" aria-label="Close" onclick={closeModal}>
					&times;
				</button>
				<h2>Continue to XiövWrites</h2>
				<div id="provider">
					<button onclick={loginWithGoogle} aria-label="Log in with Google">
						<svg height="32" width="32" viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
							<path
								fill="currentColor"
								d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z"
							/>
						</svg>
						<span>Log in with Google</span>
					</button>
					<button onclick={loginWithGithub} aria-label="Log in with GitHub">
						<svg height="32" width="32" viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
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

	{@render children()}
{/if}

<style lang="scss">
@use 'sass:color';
@use '$styles/variables' as v;
@use "$styles/mixins" as *;

$button: #00ff7f;
$modal-bg: color.scale(v.$color-dark, $lightness: 4%);
$hover-bg: color.scale($button, $alpha: -0.85%);
$shadow: 0 6px 24px rgba(0, 0, 0, 0.5);

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
		font-size: 1.2rem;
	}
	.spinner {
		width: 2.5rem;
		height: 2.5rem;
		border: 3px solid rgba(0, 255, 127, 0.2);
		border-top-color: $button;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}
}
@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

/* === Header === */
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
	color: v.$color-light;

	.brand {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
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

		a,
		button {
			display: block;
			width: 100%;
			text-align: left;
			color: v.$color-light;
			background: none;
			border: none;
			padding: 0.45rem 0;
			cursor: pointer;

			&:hover {
				color: #ffcc00;
			}
		}
	}
}

/* === Modal === */
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
	width: min(90%, 400px);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	#provider {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;

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
			transition: all 0.25s ease;
			width: 100%;

			&:hover {
				background: $hover-bg;
				text-shadow: 0 0 5px $button;
				transform: translateY(-1px);
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
		transition: transform 0.25s ease, color 0.25s ease;
		&:hover {
			transform: rotate(90deg);
			color: #ff5555;
		}
	}
}
</style>