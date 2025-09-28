import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { browser } from '$app/environment';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASESTORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASEMESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_API_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);

const analytics = browser ? getAnalytics(app) : null;
const appCheck = browser
	? initializeAppCheck(app, {
			provider: new ReCaptchaV3Provider(import.meta.env.VITE_FIREBASE_APP_CHECK_API_KEY),
			isTokenAutoRefreshEnabled: true
		})
	: null;
