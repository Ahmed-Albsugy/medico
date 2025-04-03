import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth();

const container = document.querySelector(".container");
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");
const loginForm = document.querySelector(".login .btn");
const registerForm = document.querySelector(".register .btn");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

registerForm.addEventListener("click", async (e) => {
  e.preventDefault();
  const userName = document.getElementById("Username");
  const email = document.getElementById("register-email");
  const password = document.getElementById("register-password");
  let hasError = false;
  let errorMessage;

  clearError(userName);
  clearError(email);
  clearError(password);

  if (!validateName(userName.value)) {
    showError(userName, "The username must be at least 3 characters ");
    hasError = true;
  }
  if (!validateEmail(email.value)) {
    showError(email, "Please enter a valid email address.");
    hasError = true;
  }
  if (!validatePassword(password)) {
    hasError = true;
  }
  if (hasError) {
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value.trim()
    );
    const user = userCredential.user;
    sendEmailVerification(user);
    await setDoc(doc(db, "users", user.uid), {
      info: {
        username: userName.value,
        email: email.value.trim(),
        uid: user.uid,
        phone: "",
        address: "",
        image: "../images/home/image 18.png",
      },
    });
    showToast("Registration successful! Please verify your email.", "success");
    container.classList.remove("active");
  } catch (error) {
    switch (error.message) {
      case "Firebase: Error (auth/email-already-in-use).":
        errorMessage = "this email is already in use!";
        break;
      case "Firebase: Error (auth/network-request-failed).":
        errorMessage = "please check your internet connection!";
        break;
      default:
        errorMessage = error.message;
    }
    showToast("Error : " + errorMessage, "error");
  }
});

loginForm.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");
  let errorMessage;

  let hasError = false;
  clearError(email);
  clearError(password);

  if (!validateEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address.");
    hasError = true;
  }
  if (!validatePassword(password)) {
    hasError = true;
  }
  if (hasError) {
    return;
  }
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value.trim(),
      password.value.trim()
    );
    const user = userCredential.user;
    if (!user.emailVerified) {
      showToast("Please verify your email before logging in.", "error");
    } else {
      showToast("Login successful!", "success");
      setCockies("user", user.uid);
    }
  } catch (error) {
    switch (error.message) {
      case "Firebase: Error (auth/wrong-password).":
        errorMessage = "wrong password!";
        break;
      case "Firebase: Error (auth/user-not-found).":
        errorMessage = "user not found!";
        break;
      case "Firebase: Error (auth/network-request-failed).":
        errorMessage = "please check your internet connection!";
        break;
      case "Firebase: Error (auth/invalid-credential).":
        errorMessage = "Email or password is invalid!";
        break;
      default:
        errorMessage = error.message;
    }
    showToast("Error : " + errorMessage, "error");
  }
});

function setCockies(name, value) {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function showError(input, message) {
  const box = input.parentElement;
  box.classList.add("error");
  input.classList.add("error");
  box.setAttribute("data-error", message);
}

function clearError(input) {
  const box = input.parentElement;
  box.classList.remove("error");
  input.classList.remove("error");
  box.removeAttribute("data-error");
}

function validateName(name) {
  const re = /^[a-zA-Z]{3,}/;
  return re.test(name);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  if (password.value.trim().length < 8) {
    showError(password, "password must be at least 8 characters long.");
    return false;
  }
  if (!/[a-z]/.test(password.value.trim())) {
    showError(password, "Password must include a lowercase letter.");
    return false;
  }
  if (!/[A-Z]/.test(password.value.trim())) {
    showError(password, "Password must include an uppercase letter.");
    return false;
  }
  if (!/\d/.test(password.value.trim())) {
    showError(password, "Password must contain a number.");
    return false;
  }
  if (!/[\W_]/.test(password.value.trim())) {
    showError(password, "Password must have a special character.");
    return false;
  }
  return true;
}

function showToast(message, type = "error") {
  let toast = document.querySelector(".toast");
  let toastCheck = document.querySelector(".toast-content .check");
  let toastMessage = document.querySelector(".message .text-2");
  let toastTitle = document.querySelector(".message .text-1");
  let progress = document.querySelector(".progress");

  if (type === "success") {
    toastTitle.innerHTML = "success";
    toast.classList.add("success");
    toastCheck.style.backgroundColor = "#4BB543";
    toast.style.borderRight = "6px solid #6af440";
  } else {
    toastTitle.innerHTML = "error";
    toast.classList.remove("success");
    toastCheck.style.backgroundColor = "#e74c3c";
    toast.style.borderRight = "6px solid #e74c3c";
  }

  toastMessage.innerHTML = message;
  toast.classList.add("active");
  progress.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 4000);
  setTimeout(() => {
    progress.classList.remove("active");
  }, 4300);
}
