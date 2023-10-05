import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLBDRgitSoZ-ZW2Jjs99xJmaZx9wP5M_I",
  authDomain: "pinterest-d5663.firebaseapp.com",
  projectId: "pinterest-d5663",
  storageBucket: "pinterest-d5663.appspot.com",
  messagingSenderId: "42427688130",
  appId: "1:42427688130:web:c9e5f186c6b34906cac75b"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage}
export default app;