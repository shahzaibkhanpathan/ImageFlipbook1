import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAgGYxOkc5oJgBkGVriIBKv-4XaT9IFrI",
  authDomain: "imageflipbook.firebaseapp.com",
  projectId: "imageflipbook",
  storageBucket: "imageflipbook.appspot.com",
  messagingSenderId: "665515181507",
  appId: "1:665515181507:web:37101c7e793c4ef8b76976"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
