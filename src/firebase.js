import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBaO-1646aaZl80oN_kEmrYlS4NDsD_Evk",
  authDomain: "tiendaonline-9451a.firebaseapp.com",
  projectId: "tiendaonline-9451a",
  storageBucket: "tiendaonline-9451a.appspot.com",
  messagingSenderId: "147956001319",
  appId: "1:147956001319:web:0dc37e2f7943a2efc0fc02",
  measurementId: "G-T66Q1XNBD5",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();
export { auth, db, provider };
