import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
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
  const [authInitialized, setAuthInitialized] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, [auth]);

  if (!authInitialized) {
    return <div>Loading...</div>; // or some sort of loading spinner
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
            </>
          }
          aria-label="Home"
        />
        <Route path="/hero" element={<Hero />} aria-label="Hero" />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
          aria-label="Dashboard"
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
