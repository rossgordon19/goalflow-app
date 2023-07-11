import { useState, SetStateAction, Dispatch } from 'react';
import { getAuth, signOut, User } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import '../hamburgers.css';

interface NavbarProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
  const [nav, setNav] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

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
    setLoginModalOpen(false);
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setLoginModalOpen(false);
      setSignUpModalOpen(false);
      setNav(false);
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
    if (window.innerWidth < 768) handleClick();
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
              onClick={() => {
                handleNavClick('/');
                openLoginModal();
              }}
            >
              Log In
            </li>
            <li
              className="cursor-pointer py-6 text-5xl hover:scale-110 transform transition"
              onClick={() => {
                handleNavClick('/');
                openSignUpModal();
              }}
            >
              Sign Up
            </li>
          </>
        )}
      </ul>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        closeModal={closeLoginModal} 
        openSignUpModal={openSignUpModal} 
      />

      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        closeModal={closeSignUpModal} 
      />
    </div>
  );
};

export default Navbar;
