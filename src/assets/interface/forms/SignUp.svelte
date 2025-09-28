<script lang="ts">
	import { signUp } from '$lib/services/firebase';
	import { showSignUp } from '$stores/auth';
	import EnvelopeIcon from '$assets/icons/Envelope.svelte';
	import KeyIcon from '$assets/icons/Key.svelte';
	import EyeIcon from '$assets/icons/Eye.svelte';
	import EyeSlashIcon from '$assets/icons/EyeSlash.svelte';

	let email = '';
	let password = '';
	let confirm = '';

	let emailValid = true;
	let passwordsMatch = true;

	let showPassword = false;
	let showConfirm = false;

	function updateValidation() {
		emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
		passwordsMatch = password === confirm;
	}

	async function handleSignUp() {
		updateValidation();
		if (!emailValid || !passwordsMatch) return;

		try {
			await signUp(email.trim(), password);
			console.log('Signed up!');
		} catch (e: any) {
			console.log(`Error: ${e?.message}`);
		}
	}
</script>

<div class="authForm">
	<div class="wrap">
		<EnvelopeIcon />
		<input
			type="email"
			placeholder="Enter email"
			bind:value={email}
			on:input={updateValidation}
			class:bad={!emailValid && email.length > 0}
		/>
	</div>

	<div class="wrap">
		<KeyIcon />
		<input
			type={showPassword ? 'text' : 'password'}
			placeholder="Enter password"
			bind:value={password}
			on:input={updateValidation}
		/>
		<button type="button" class="icon-btn" on:click={() => (showPassword = !showPassword)}>
			{#if showPassword}
				<EyeSlashIcon />
			{:else}
				<EyeIcon />
			{/if}
		</button>
	</div>

	<div class="wrap">
		<KeyIcon />
		<input
			type={showConfirm ? 'text' : 'password'}
			placeholder="Confirm password"
			bind:value={confirm}
			on:input={updateValidation}
			class:ok={confirm && passwordsMatch}
			class:bad={confirm && !passwordsMatch}
		/>
		<button type="button" class="icon-btn" on:click={() => (showConfirm = !showConfirm)}>
			{#if showConfirm}
				<EyeSlashIcon />
			{:else}
				<EyeIcon />
			{/if}
		</button>
	</div>

	<button class="submit" on:click={handleSignUp}>Sign Up</button>
	<p>
		Already have an account? Log in <a
			href="#"
			on:click|preventDefault={() => {
				showSignUp.set(false);
			}}
			aria-label="Log in here">here</a
		>.
	</p>
</div>
