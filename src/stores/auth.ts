import { writable } from 'svelte/store';
import { auth } from '$lib/services/firebase/auth';
import { onAuthStateChanged, type User } from 'firebase/auth';

export const currentUser = writable<User | null>(null);
export const loading = writable(true);

onAuthStateChanged(auth, (user) => {
	currentUser.set(user);
	loading.set(false);
});
