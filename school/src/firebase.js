import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCHa82aOxu1sVpMpisvoD5d5XjM1zhidgo",
  authDomain: "school-website-c91a4.firebaseapp.com",
  projectId: "school-website-c91a4",
  storageBucket: "school-website-c91a4.appspot.com",
  messagingSenderId: "664431602902",
  appId: "1:664431602902:web:6b3663a7b91e311af42d77",
  measurementId: "G-F0BDCVLKHW"
};  

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export { db };
