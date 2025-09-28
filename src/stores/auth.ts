import { writable } from 'svelte/store';

export const showAuthModal = writable(false);
export const showSignOut = writable(false);
export const showSignUp = writable(false);
