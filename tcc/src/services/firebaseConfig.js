import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABwyEEhsgKjYs2ZA5XPEQ1up-PENZwvCw",
  authDomain: "login-tcc-19a91.firebaseapp.com",
  projectId: "login-tcc-19a91",
  storageBucket: "login-tcc-19a91.appspot.com",
  messagingSenderId: "14060520865",
  appId: "1:14060520865:web:874f51e7ac2750319f77e0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);