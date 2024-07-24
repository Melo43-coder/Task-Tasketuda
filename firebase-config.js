// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOhJpCEVxRStJAgbBj9-hHWZWn4f7tpUY",
  authDomain: "projeto-relatorios-c8635.firebaseapp.com",
  databaseURL: "https://projeto-relatorios-c8635-default-rtdb.firebaseio.com",
  projectId: "projeto-relatorios-c8635",
  storageBucket: "projeto-relatorios-c8635.appspot.com",
  messagingSenderId: "963282709859",
  appId: "1:963282709859:web:859af48eacfaeb1caa3756",
  measurementId: "G-25V7G487PG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
