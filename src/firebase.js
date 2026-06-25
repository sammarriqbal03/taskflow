// ✅ Firebase SDK imports
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ✅ Your Firebase config (jo tumne diya)
const firebaseConfig = {
  apiKey: "AIzaSyDr1jm-uHGX9FAGnct-LSUtW-eH4HS4hNI",
  authDomain: "taskflow-5d9c3.firebaseapp.com",
  projectId: "taskflow-5d9c3",
  storageBucket: "taskflow-5d9c3.firebasestorage.app",
  messagingSenderId: "350409221959",
  appId: "1:350409221959:web:d101c78fea65e4e2fd8e62",
  measurementId: "G-FHT74M6ZPV"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Services initialize
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// ✅ Analytics (optional)
export const analytics = getAnalytics(app);