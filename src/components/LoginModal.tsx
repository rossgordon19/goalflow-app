import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
  return (
    <div className="border-t-4 border-b-4 border-gray-200 rounded-full animate-spin w-6 h-6"></div>
  );
};

const LoginModal = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate(); // Add useNavigate hook

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, provider);
      // No need to close the modal or redirect here
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      closeModal();
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleRedirectAuth = async () => {
      try {
        await getRedirectResult(auth);
        closeModal();
        navigate('/dashboard'); // Redirect to dashboard after successful Google Sign-In
      } catch (error) {
        setError(error.message);
      }
    };

    handleRedirectAuth();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="inline-block align-bottom bg-[#004449] text-[#d7ffc2] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-[#004449] px-10 py-10 sm:px-6 flex flex-col items-center">
          <button
            onClick={closeModal}
            className="ml-auto bg-transparent border-0 text-[#d7ffc2] hover:text-gray-700"
            aria-label="Close modal"
          >
            <span className="sr-only">Close modal</span>
            <span aria-hidden="true">X</span>
          </button>
          <h3
            className="text-lg leading-6 font-medium text-[#d7ffc2]"
            id="modal-headline"
          >
            Log in to GoalFlow
          </h3>
          <form className="mt-4 w-64" onSubmit={handleEmailPasswordSubmit}>
            <input
              className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
              aria-label="Email"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
              aria-label="Password"
            />
            <button
              type="submit"
              className="w-full p-2 bg-[#d7ffc2] text-black rounded flex justify-center items-center mb-2"
              disabled={loading}
            >
              {loading ? <Spinner /> : 'Log in with Email'}
            </button>
            <div className="flex justify-center w-full">
              <GoogleButton onClick={signInWithGoogle} />
            </div>
          </form>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default LoginModal;
