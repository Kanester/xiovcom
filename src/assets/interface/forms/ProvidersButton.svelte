<script lang="ts">
	import { loginWithGoogle, loginWithFacebook, loginWithGithub } from '$lib/services/firebase';
	import GoogleIcon from '$assets/icons/Google.svelte';
	import FacebookIcon from '$assets/icons/Facebook.svelte';
	import GithubIcon from '$assets/icons/Github.svelte';
</script>

<div class="providers">
	<button on:click={loginWithGoogle} aria-label="Log in with Google">
		<GoogleIcon />
		<span>Log in with Google</span>
	</button>
	<button on:click={loginWithFacebook} aria-label="Log in with Facebook">
		<FacebookIcon />
		<span>Log in with Facebook</span>
	</button>
	<button on:click={loginWithGithub} aria-label="Log in with Github">
		<GithubIcon />
		<span>Log in with Github</span>
	</button>
</div>
