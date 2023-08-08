import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyD_hYajmhhsV82BD0ymAYRJn_SJZvceTXI",
  authDomain: "family-zone-pro.firebaseapp.com",
  projectId: "family-zone-pro",
  storageBucket: "family-zone-pro.appspot.com",
  messagingSenderId: "798179376952",
  appId: "1:798179376952:web:8fadc657cf09ffcedb0bcd",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const database = getDatabase();
// apiKey: "AIzaSyD_hYajmhhsV82BD0ymAYRJn_SJZvceTXI",
//   authDomain: "family-zone-pro.firebaseapp.com",
//   projectId: "family-zone-pro",
//   storageBucket: "family-zone-pro.appspot.com",
//   messagingSenderId: "798179376952",
//   appId: "1:798179376952:web:8fadc657cf09ffcedb0bcd",
