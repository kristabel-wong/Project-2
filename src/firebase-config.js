// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: "project-2-5825e.firebaseapp.com",
	projectId: "project-2-5825e",
	storageBucket: "project-2-5825e.appspot.com",
	messagingSenderId: "1036084019168",
	appId: "1:1036084019168:web:a99cc60d4a4816cde4f585",
	measurementId: "G-9QF6W07Z6W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
