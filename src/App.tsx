import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAlNLiKVwXmYM-OWWky5ehPP3kjm7NZMJo',
  authDomain: 'goal-flow-aba61.firebaseapp.com',
  projectId: 'goal-flow-aba61',
  storageBucket: 'goal-flow-aba61.appspot.com',
  messagingSenderId: '677276282393',
  appId: '1:677276282393:web:eaaf3de532002c815fc488',
  measurementId: 'G-07ZZC9ES7Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

function App() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <Navbar user={user} />
      {!user ? <Hero /> : <Dashboard />}
    </>
  );
}

export default App;
