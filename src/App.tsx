import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Dashboard from './components/Dashboard';
import { getFirestore } from 'firebase/firestore';
import Footer from './components/Footer';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [nav, setNav] = useState(false);  // moved nav state up to App.tsx
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setNav(false);  // reset nav state every time user state changes
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Navbar user={user} nav={nav} setNav={setNav} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
            </>
          }
        />
        <Route path="/hero" element={<Hero />} />
        {user ? <Route path="/dashboard" element={<Dashboard />} /> : null}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
