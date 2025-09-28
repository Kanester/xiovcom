<script lang="ts">
	import { logout } from "$lib/services/firebase";
	import { showAuthModal } from "$stores/auth";
</script>

    <h2>Log Out</h2>
    <p>Are you sure you want to log out?</p>
    <div class="actions">
      <button on:click|preventDefault={() => showAuthModal.set(false)}>Cancel</button>
      <button on:click|preventDefault={logout}>Log Out</button>
    </div>
