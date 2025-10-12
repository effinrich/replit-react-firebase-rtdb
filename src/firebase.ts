import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const databaseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

if (!projectId || !apiKey || !appId || !databaseURL) {
  console.error('Missing Firebase configuration:', {
    hasProjectId: !!projectId,
    hasApiKey: !!apiKey,
    hasAppId: !!appId,
    hasDatabaseURL: !!databaseURL
  });
  throw new Error('Firebase configuration is incomplete. Please check your environment variables.');
}

const firebaseConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL,
  projectId,
  storageBucket: `${projectId}.firebasestorage.app`,
  appId
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
