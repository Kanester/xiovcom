import { app } from './app';
import {
	getFirestore,
	collection,
	getDocs,
	doc,
	getDoc,
	addDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	type DocumentData,
	CollectionReference
} from 'firebase/firestore';

export const db = getFirestore(app);

// -------------------------
// UTILITY HELPERS
// -------------------------

/**
 * Get all documents from a collection
 */
export async function getAll<T = DocumentData>(collectionName: string): Promise<T[]> {
	const colRef: CollectionReference = collection(db, collectionName);
	const snapshot = await getDocs(colRef);
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
}

/**
 * Get a single document by ID
 */
export async function getById<T = DocumentData>(
	collectionName: string,
	docId: string
): Promise<T | null> {
	const docRef = doc(db, collectionName, docId);
	const snapshot = await getDoc(docRef);
	if (!snapshot.exists()) return null;
	return { id: snapshot.id, ...snapshot.data() } as T;
}

/**
 * Add a new document to a collection
 */
export async function addNew(collectionName: string, data: object) {
	const colRef = collection(db, collectionName);
	const docRef = await addDoc(colRef, data);
	return docRef.id;
}

/**
 * Set / overwrite a document
 */
export async function setDocument(collectionName: string, docId: string, data: object) {
	const docRef = doc(db, collectionName, docId);
	await setDoc(docRef, data);
}

/**
 * Update an existing document
 */
export async function updateDocument(collectionName: string, docId: string, data: object) {
	const docRef = doc(db, collectionName, docId);
	await updateDoc(docRef, data);
}

/**
 * Delete a document
 */
export async function deleteDocument(collectionName: string, docId: string) {
	const docRef = doc(db, collectionName, docId);
	await deleteDoc(docRef);
}
