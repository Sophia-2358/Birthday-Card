// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVWn1hvQC4Jb3AscCsZULUp3giW-Imi0s",
  authDomain: "birthday-cards-b9227.firebaseapp.com",
  projectId: "birthday-cards-b9227",
  storageBucket: "birthday-cards-b9227.firebasestorage.app",
  messagingSenderId: "488258846366",
  appId: "1:488258846366:web:57a92594241b74ef22858f",
  measurementId: "G-XP9MLZ99ZG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
