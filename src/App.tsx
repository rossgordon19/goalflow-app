import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  getAuth,
  onAuthStateChanged,
  User,
  getRedirectResult,
} from 'firebase/auth';
import ReactLoading from 'react-loading';
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

    // Handle the redirect result for Google Sign-In
    getRedirectResult(auth)
      .then((result) => {
        if (result.user) {
          setUser(result.user);
          // Redirect to the dashboard after successful login
          window.location.href = '/dashboard';
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => unsubscribe();
  }, [auth]);

  if (!authInitialized) {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className="inline-block align-middle bg-[#004449] text-[#d7ffc2] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-labelledby="modal-headline"
        >
          <div className="bg-[#004449] px-10 py-10 sm:px-6 flex flex-col items-center">
            <ReactLoading
              type={'spin'}
              color={'#fff'}
              height={'20%'}
              width={'20%'}
              aria-label="Loading"
            />
          </div>
        </div>
      </div>
    );
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
