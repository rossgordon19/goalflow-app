import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Spinner = () => {
  return (
    <div
      className="border-t-4 border-b-4 border-gray-200 rounded-full animate-spin w-6 h-6"
      aria-label="Loading"
    ></div>
  );
};

const LoginModal = ({ isOpen, closeModal, openSignUpModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      closeModal();
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      setIsLoggingIn(false);
    }
  };
  useEffect(() => {
    if (!isOpen) {
      setIsLoggingIn(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        className="inline-block align-bottom bg-[#004449] text-[#d7ffc2] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-labelledby="modal-headline"
      >
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
          {isLoggingIn ? (
            <ReactLoading
              type={'spin'}
              color={'#fff'}
              height={'20%'}
              width={'20%'}
              aria-label="Loading"
            />
          ) : (
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
                {loading ? <Spinner /> : 'Log In'}
              </button>
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full p-2 bg-[#d7ffc2] text-black rounded flex justify-center items-center mb-2 md:block hidden"
              >
                Sign In with Google
              </button>

              <button
                type="button"
                onClick={openSignUpModal}
                className="w-full p-2 bg-[#d7ffc2] text-black rounded flex justify-center items-center mb-2"
              >
                Sign Up
              </button>
            </form>
          )}
          {error && (
            <p className="text-red-500 text-xs mt-2" aria-live="polite">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openSignUpModal: PropTypes.func.isRequired,
};

export default LoginModal;
