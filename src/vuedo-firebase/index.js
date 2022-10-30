import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCX-Gr-3sOgQGV3H3YJ1dKRGw2oI9PfIuo",
	authDomain: "kpomeru-vuedo.firebaseapp.com",
	projectId: "kpomeru-vuedo",
	storageBucket: "kpomeru-vuedo.appspot.com",
	messagingSenderId: "452925201270",
	appId: "1:452925201270:web:e1fa2251a1742fa5fe3857",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { app, auth, db };
