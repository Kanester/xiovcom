<script lang="ts">
	import { logout } from "$lib/services/firebase";
	import { showSignOut } from "$stores/auth";
	
	const handleSignOut = () => {
		logout();
		showSignOut.set(false);
	}
</script>

    <h2>Log Out</h2>
    <p>Are you sure you want to log out?</p>
    <div class="actions">
      <button on:click={() => showSignOut.set(false)}>Cancel</button>
      <button on:click={handleSignOut}>Log Out</button>
    </div>
