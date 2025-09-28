export { app } from './app';

export {
	auth,
	signUp,
	login,
	loginWithGoogle,
	loginWithFacebook,
	loginWithGithub,
	logout,
	getCurrentUser
} from './auth';

export {
	db,
	getAll,
	getById,
	addNew,
	setDocument,
	updateDocument,
	deleteDocument
} from './database';
