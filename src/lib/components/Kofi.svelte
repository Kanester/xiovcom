<a href="https://ko-fi.com/kiovcom/tip" target="_blank" id="kofi-btn">
	<button> Buy me a coffee ☕ </button>
</a>

<style lang="scss">
	@use '$styles/variables' as *;
	#kofi-btn {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 9999;
		text-decoration: none;
	}

	#kofi-btn button {
		background-color: $accent-red;
		color: white;
		padding: 12px 20px;
		font-size: 16px;
		border: none;
		border-radius: 50px;
		cursor: pointer;
		font-weight: bold;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s ease-in-out;
	}

	#kofi-btn button:hover {
		transform: scale(1.05);
	}
</style>
