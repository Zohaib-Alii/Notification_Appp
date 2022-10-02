// firebse Credential
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBX5gPTIHbZJ9f2rbh7_h6hcfzYrGJc15Q",
  authDomain: "notification-app-d17c2.firebaseapp.com",
  projectId: "notification-app-d17c2",
  storageBucket: "notification-app-d17c2.appspot.com",
  messagingSenderId: "607523365515",
  appId: "1:607523365515:web:eba6d2ba89e929e829ea8e",
  measurementId: "G-C59LETKRG0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { auth, app, db };
