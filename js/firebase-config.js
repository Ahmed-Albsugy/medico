// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Import Firebase SDK (Ensure your HTML has Firebase scripts)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwQzmufN0aBDN2EtAFa7AicXFb1M2K_bc",
  authDomain: "medico-store-93b08.firebaseapp.com",
  databaseURL: "https://medico-store-93b08-default-rtdb.firebaseio.com",
  projectId: "medico-store-93b08",
  storageBucket: "medico-store-93b08.firebasestorage.app",
  messagingSenderId: "797991381198",
  appId: "1:797991381198:web:f41e1ef15b0c995b98089f",
  measurementId: "G-1SXFR12SV3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
window.db = db;
export { db, collection, addDoc, getDocs, auth };
