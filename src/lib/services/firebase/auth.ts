import { app } from './app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
	type User
} from 'firebase/auth';

export const auth = getAuth(app);

// -------------------------
// EMAIL / PASSWORD
// -------------------------
export async function signUp(email: string, password: string): Promise<User> {
	try {
		const userCred = await createUserWithEmailAndPassword(auth, email, password);
		return userCred.user;
	} catch (err: any) {
		console.error('SignUp error:', err.code, err.message);
		throw err;
	}
}

export async function login(email: string, password: string): Promise<User> {
	try {
		const userCred = await signInWithEmailAndPassword(auth, email, password);
		return userCred.user;
	} catch (err: any) {
		console.error('Login error:', err.code, err.message);
		throw err;
	}
}

// -------------------------
// SOCIAL LOGIN
// -------------------------
export async function loginWithGoogle(): Promise<User> {
	try {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		return result.user;
	} catch (err: any) {
		console.error('Google login error:', err.code, err.message);
		throw err;
	}
}

export async function loginWithGithub(): Promise<User> {
	try {
		const provider = new GithubAuthProvider();
		const result = await signInWithPopup(auth, provider);
		return result.user;
	} catch (err: any) {
		console.error('GitHub login error:', err.code, err.message);
		throw err;
	}
}

// -------------------------
// LOGOUT
// -------------------------
export async function logout() {
	try {
		await signOut(auth);
	} catch (err: any) {
		console.error('Logout error:', err.code, err.message);
		throw err;
	}
}

// -------------------------
// CURRENT USER HELPER
// -------------------------
export function getCurrentUser(): User | null {
	return auth.currentUser;
}
