<script lang="ts">
	import { login } from '$lib/services/firebase';
	import { showSignUp } from '$stores/auth';
	import EnvelopeIcon from '$assets/icons/Envelope.svelte';
	import KeyIcon from '$assets/icons/Key.svelte';

	let email = '';
	let password = '';

	let emailValid = true;

	function updateValidation() {
		emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
	}

	async function handleLogin() {
		updateValidation();
		if (!emailValid || !password) return;
		try {
			await login(email.trim(), password);
			console.log('Logged in!');
		} catch (e: any) {
			console.log(`Error: ${e?.message}`);
		}
	}
</script>

<div class="authForm">
	<div class="wrap">
		<EnvelopeIcon />
		<input
			id="email"
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
			id="password"
			type="password"
			placeholder="Enter password"
			bind:value={password}
			class:bad={!password && email.length > 0}
		/>
	</div>

	<button class="submit" on:click={handleLogin}>Log In</button>
	<p>
		Don't have an account? Sign In <a
			href="#"
			on:click|preventDefault={() => {
				showSignUp.set(true);
			}}
			aria-label="Sign in here">here</a
		>.
	</p>
</div>
