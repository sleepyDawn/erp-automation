import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";
// import "firebase/database";
// import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAll-DIYSrv9kz5UYZFkBv1_078WjnZIio",
  authDomain: "mobile-haul-load-sheet.firebaseapp.com",
  projectId: "mobile-haul-load-sheet",
  storageBucket: "mobile-haul-load-sheet.appspot.com",
  messagingSenderId: "883089747010",
  appId: "1:883089747010:web:c477b3a69bf8bbe4ff11db",
  measurementId: "G-WCN9CT8Y8C"
}



const firebaseApp = initializeApp(firebaseConfig);

// Initializing cloud firestore through firebase
const db = getFirestore(firebaseApp);

// google authentication
const googleProvider = new GoogleAuthProvider();

export { googleProvider, db as default };
