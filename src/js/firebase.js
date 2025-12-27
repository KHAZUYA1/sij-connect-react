// src/js/firebase.js

// 1. UBAH IMPORT: Dari CDN (URL) menjadi NPM Package
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    collection, 
    getDocs, 
    query, 
    orderBy,
    // Tambahan fungsi yang dibutuhkan Admin.jsx (Supaya tidak error)
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";

// 2. CONFIG: Tetap sama persis dengan yang kamu kasih
const firebaseConfig = {
    apiKey: "AIzaSyA6XJ88lrRNLfhaGhGuW8KTzq1AlfyA8K4",
    authDomain: "websij-connect.firebaseapp.com",
    projectId: "websij-connect",
    storageBucket: "websij-connect.firebasestorage.app",
    messagingSenderId: "842875142110",
    appId: "1:842875142110:web:3328ee5fa900e180b7274f",
    measurementId: "G-X82FHHQZC7"
};

// 3. INIT FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase (Vite) Berhasil Terhubung!");

// 4. FUNGSI ORIGINAL KAMU (Tetap dipertahankan)
export async function getNews() {
  const newsList = [];
  try {
    const q = query(collection(db, "news"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newsList.push({ id: doc.id, ...doc.data() });
    });
    return newsList;
  } catch (error) {
    console.error("Error GetNews:", error);
    return [];
  }
}

// 5. EXPORT: Penting agar bisa dipakai di file lain (Admin, Login, dll)
export { 
    auth, 
    db, 
    // Auth functions
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    // Firestore functions
    doc, 
    setDoc, 
    getDoc, 
    addDoc,       // Penting untuk Tambah Berita/Karir
    updateDoc,    // Penting untuk Edit
    deleteDoc,    // Penting untuk Hapus
    collection,  
    getDocs,     
    query,       
    orderBy,
    serverTimestamp 
};