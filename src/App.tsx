import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDIAnGsZ1zUsKD219jG2GUfgf4XAbGVZAE',
  authDomain: 'goal-flow-7491e.firebaseapp.com',
  projectId: 'goal-flow-7491e',
  storageBucket: 'goal-flow-7491e.appspot.com',
  messagingSenderId: '684939875728',
  appId: '1:684939875728:web:7c9ae14f897c3191198f15',
  measurementId: 'G-0VQ3Y6GTDP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
