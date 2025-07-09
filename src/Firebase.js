
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCiXKVir8SMkwdQKnwYjBYZAByttcHITqo",
    authDomain: "test-app-66c45.firebaseapp.com",
    projectId: "test-app-66c45",
    storageBucket: "test-app-66c45.firebasestorage.app",
    messagingSenderId: "629951620920",
    appId: "1:629951620920:web:4100fa5dee3b60b5bf43cd",
    measurementId: "G-M371K4WPCS",

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

