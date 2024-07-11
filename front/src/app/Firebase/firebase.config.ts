import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD17xsncqKRyiijA5Y6ly4t6c1ddGxwQpQ",
  authDomain: "pf-chat-65f65.firebaseapp.com",
  projectId: "pf-chat-65f65",
  storageBucket: "pf-chat-65f65.appspot.com",
  messagingSenderId: "310498286523",
  appId: "1:310498286523:web:c961f66ea4afcf7ef6829e",
  measurementId: "G-7W7954DLN7",
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const database = getDatabase(app);

export { database };
