// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD8Y5f29R8fcyZeaPHziR7j_jG2YyeVep0",
  authDomain: "jobbook-86914.firebaseapp.com",
  projectId: "jobbook-86914",
  storageBucket: "jobbook-86914.appspot.com",
  messagingSenderId: "745496491378",
  appId: "1:745496491378:web:89186dea865ed71d6ad9eb",
  measurementId: "G-GN6ZHYLS7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new FacebookAuthProvider();
export const auth = getAuth()
export const googleAuthProvider = new GoogleAuthProvider 

export const FacebookAuth = async () => {
  const fbAuth = signInWithPopup(auth,provider,)
  return fbAuth

}

