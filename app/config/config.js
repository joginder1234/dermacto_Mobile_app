import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCjrtqT-ePV2Yfri4_k0Jx1sqe7H3n5BQE",
  authDomain: "dermacto-506ea.firebaseapp.com",
  projectId: "dermacto-506ea",
  storageBucket: "dermacto-506ea.appspot.com",
  messagingSenderId: "933112290867",
  appId: "1:933112290867:web:d4533225d84e63e4fc4d46",
  measurementId: "G-98246NQSPZ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
