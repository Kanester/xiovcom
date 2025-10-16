export { app } from './app';

export { auth, loginWithGoogle, loginWithGithub, logout, getCurrentUser } from './auth';

export { type User, onAuthStateChanged } from 'firebase/auth';

export {
	db,
	getAll,
	getById,
	addNew,
	setDocument,
	updateDocument,
	deleteDocument
} from './database';
