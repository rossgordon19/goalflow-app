import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-GgSk7nHSY5cyCK_dEwoY3hD851nodmc",
  authDomain: "goal-flow-afba9.firebaseapp.com",
  projectId: "goal-flow-afba9",
  storageBucket: "goal-flow-afba9.appspot.com",
  messagingSenderId: "400278466881",
  appId: "1:400278466881:web:caf551a09942e46cef71c0",
  measurementId: "G-T3Q2KSH7FD"
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
