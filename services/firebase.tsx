import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAYiAveMtikdjmzZZElIpU3JtC6jhZ5Ir0',
  authDomain: 'test-a7eb1.firebaseapp.com',
  projectId: 'test-a7eb1',
  storageBucket: 'test-a7eb1.appspot.com',
  messagingSenderId: '108754172215',
  appId: '1:108754172215:web:f984d50e5a6356ebd482b2',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();

export const authProvider = async (provider: string) => {
  const providerSelected =
    provider === 'google' ? googleProvider : githubProvider;

  try {
    const response = await signInWithPopup(auth, providerSelected);
    console.log(response.user);
  } catch (error) {
    console.log({ error });
  }
};
