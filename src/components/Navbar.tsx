import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import '../hamburgers.css';

const Navbar = ({ user }) => {
  const [nav, setNav] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    setNav(!nav);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const handleEmailPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginModalOpen(false);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (window.innerWidth < 768) setNav(false);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleLogoClick = () => {
    if (user !== null) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleNavClick = (route) => {
    if (window.innerWidth < 768) handleClick(); // Modified here
    navigate(route);
  };

  return (
    <div className="sticky top-0 z-50 w-full h-[80px] flex items-center px-4 bg-[#004449] text-[#d7ffc2]">
      <div className="flex justify-between w-full">
        {/* Left side */}
        <div className="flex items-center">
          <div className="text-[#d7ffc2]">
            <Link to="/">
              <div
                className="font-bold text-3xl cursor-pointer"
                onClick={handleLogoClick}
              >
                GoalFlow
              </div>
            </Link>
          </div>
        </div>

        {/* Right side */}
        <ul className="hidden md:flex space-x-4 text-xl items-center cursor-pointer">
          {user ? (
            <>
              <li onClick={() => handleNavClick('/dashboard')}>Dashboard</li>
              <li onClick={handleLogout}>Log Out</li>
            </>
          ) : (
            <>
              <li onClick={openLoginModal}>Log In</li>
              <li onClick={openSignUpModal}>Sign Up</li>
            </>
          )}
        </ul>
      </div>

      {/* Hamburger Menu */}
      <div onClick={handleClick} className="z-10 md:hidden">
        <button
          className={`hamburger hamburger--vortex ${nav ? 'is-active' : ''}`}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        className={
          !nav
            ? 'hidden'
            : 'absolute text-2xl top-0 left-0 w-full h-screen bg-[#004449] text-[#d7ffc2] flex flex-col justify-center items-center'
        }
      >
        {user ? (
          <>
            <li
              className="cursor-pointer py-6 text-5xl hover:scale-110 transform transition"
              onClick={() => handleNavClick('/dashboard')}
            >
              Dashboard
            </li>
            <li
              className="cursor-pointer py-6 text-5xl hover:scale-110 transform transition"
              onClick={handleLogout}
            >
              Log Out
            </li>
          </>
        ) : (
          <>
            <li
              className="cursor-pointer py-6 text-5xl hover:scale-110 transform transition"
              onClick={openLoginModal}
            >
              Log In
            </li>
            <li
              className="cursor-pointer py-6 text-5xl hover:scale-110 transform transition"
              onClick={openSignUpModal}
            >
              Sign Up
            </li>
          </>
        )}
      </ul>

      <LoginModal isOpen={isLoginModalOpen} closeModal={closeLoginModal} />
      <SignUpModal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal} />
    </div>
  );
};

export default Navbar;
