import { writable } from 'svelte/store';
import { auth } from '$lib/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const user = writable(auth.currentUser);

onAuthStateChanged(auth, (firebaseUser) => {
	user.set(firebaseUser);
});
