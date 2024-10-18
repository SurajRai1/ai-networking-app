import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';  // Using Realtime DB
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_-bK2SupaJ8TDum3L8ExQf-DWWA2dAyY",
  authDomain: "ai-networking-platform.firebaseapp.com",
  projectId: "ai-networking-platform",
  storageBucket: "ai-networking-platform.appspot.com",
  messagingSenderId: "814047446554",
  appId: "1:814047446554:web:cc4236ba2de1a811f3b3a3",
  measurementId: "G-DYM721RRMK",
  databaseURL: "https://ai-networking-platform-default-rtdb.firebaseio.com/" // Add Realtime DB URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);  // Initialize Realtime Database
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
