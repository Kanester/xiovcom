import { writable } from 'svelte/store';
import { auth } from '$lib/services/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { showAuthModal } from './auth';

export const user = writable(auth.currentUser);

onAuthStateChanged(auth, firebaseUser => {
	user.set(firebaseUser);
	showAuthModal.set(false);
});
