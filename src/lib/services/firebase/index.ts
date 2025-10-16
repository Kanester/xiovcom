export { app } from './app';

export { auth, loginWithGoogle, loginWithGithub, logout, getCurrentUser } from './auth';

export {
	db,
	getAll,
	getById,
	addNew,
	setDocument,
	updateDocument,
	deleteDocument
} from './database';
