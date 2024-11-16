import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "flood-victims.firebaseapp.com",
    projectId: "flood-victims",
    storageBucket: "flood-victims.firebasestorage.app",
    messagingSenderId: "1009735267550",
    appId: "1:1009735267550:web:104e080090c7a5bcc77e4f"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default app
export { auth }