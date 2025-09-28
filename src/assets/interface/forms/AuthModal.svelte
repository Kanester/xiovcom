<script lang="ts">
	import ProvidersButton from './ProvidersButton.svelte';
	import SignUp from './SignUp.svelte';
	import SignIn from './SignIn.svelte';
	import SignOut from './SignOut.svelte';
	import { showAuthModal, showSignUp, showSignOut } from '$stores/auth';
</script>

{#if $showAuthModal}
	<div class="authModal">
		<button on:click={() => showAuthModal.set(false)}>X</button>
		<h2>Continue to XiövWrites</h2>
		<ProvidersButton />
		<hr />

		{#if !$showSignUp}
			<p>Or log in with email</p>
			<SignIn />
		{/if}

		{#if $showSignUp}
			<p>Or sign up with email</p>
			<SignUp />
		{/if}

		{#if $showSignOut}
			<SignOut />
		{/if}
	</div>
{/if}
