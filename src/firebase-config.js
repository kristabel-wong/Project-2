// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage"; // for uploading images

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBJeCbzxP2zfXDQ2qo1B_9aBrCyM8wkbvM",
	authDomain: "project-2-5825e.firebaseapp.com",
	projectId: "project-2-5825e",
	storageBucket: "project-2-5825e.appspot.com",
	messagingSenderId: "1036084019168",
	appId: "1:1036084019168:web:a99cc60d4a4816cde4f585",
	measurementId: "G-9QF6W07Z6W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const storage = getStorage(app); // for uploading images
