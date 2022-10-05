import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import Config from '../config/environment';

const firebaseConfig = Config.firebase;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

export default db;
