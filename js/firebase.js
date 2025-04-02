// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwQzmufN0aBDN2EtAFa7AicXFb1M2K_bc",
  authDomain: "medico-store-93b08.firebaseapp.com",
  projectId: "medico-store-93b08",
  storageBucket: "medico-store-93b08.firebasestorage.app",
  messagingSenderId: "797991381198",
  appId: "1:797991381198:web:f41e1ef15b0c995b98089f",
  measurementId: "G-1SXFR12SV3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
