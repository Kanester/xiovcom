<script lang="ts">
	import { logout } from "$lib/services/firebase";
	import { showAuthModal } from "$stores/auth";
</script>

    <h2>Log Out</h2>
    <p>Are you sure you want to log out?</p>
    <div class="actions">
      <button class="cancel" on:click|preventDefault={() => showAuthModal.set(false)}>Cancel</button>
      <button class="logout" on:click|preventDefault={() => logout}>Log Out</button>
    </div>