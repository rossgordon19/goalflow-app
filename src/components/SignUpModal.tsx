import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Spinner = () => {
  return (
    <div className="border-t-4 border-b-4 border-gray-200 rounded-full animate-spin w-6 h-6"></div>
  );
};

const SignUpModal = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const signUpWithEmailPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      closeModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-[#004449] text-[#d7ffc2] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-[#004449] px-4 pt-5 pb-6 sm:p-6 sm:pb-6 flex flex-col items-center">
            <button
              onClick={closeModal}
              className="ml-auto bg-transparent border-0 text-[#d7ffc2] hover:text-gray-700"
              aria-label="Close modal"
            >
              <span className="sr-only">Close modal</span>
              <span aria-hidden="true">X</span>
            </button>
            <h3 className="text-lg leading-6 font-medium text-[#d7ffc2]" id="modal-headline">
              Sign Up to GoalFlow
            </h3>
            <form className="mt-4 w-64" onSubmit={signUpWithEmailPassword}>
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
              <input
                className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                aria-label="Confirm password"
              />
              <button
                type="submit"
                className="w-full p-2 bg-[#d7ffc2] text-black rounded flex justify-center items-center"
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Sign Up'}
              </button>
            </form>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

SignUpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SignUpModal;
