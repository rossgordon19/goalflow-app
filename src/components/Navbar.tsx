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
    <div className="sticky top-0 z-50 w-full h-[80px] flex items-center px-4 bg-[#004449] text-[#d7ffc2]" role="banner">
      <div className="flex justify-between w-full">
        <div className="flex items-center" role="navigation">
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

        <ul className="hidden md:flex space-x-4 text-xl items-center cursor-pointer" role="navigation">
          {user ? (
            <>
              <li onClick={() => handleNavClick('/dashboard')} role="menuitem" tabIndex={0}>Dashboard</li>
              <li onClick={handleLogout} role="menuitem" tabIndex={0}>Log Out</li>
            </>
          ) : (
            <>
              <li onClick={openLoginModal} role="menuitem" tabIndex={0}>Log In</li>
              <li onClick={openSignUpModal} role="menuitem" tabIndex={0}>Sign Up</li>
            </>
          )}
        </ul>
      </div>

      <div onClick={handleClick} className="z-10 md:hidden">
        <button
          className={`hamburger hamburger--vortex ${nav ? 'is-active' : ''}`}
          type="button"
          aria-label="Menu"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>

      <ul
        className={
          !nav
            ? 'hidden'
            : 'absolute text-2xl top-0 left-0 w-full h-screen bg-[#004449] text-[#d7ffc2] flex flex-col justify-center items-center'
        }
        role="menu"
      >
        {user ? (
          <>
            <li
              className="cursor-pointer py-6 text-5xl hover:scale-110 transform transition"
              onClick={() => handleNavClick('/dashboard')}
              role="menuitem"
              tabIndex={0}
            >
              Dashboard
            </li>
            <li
              className="cursor-pointer py-6 text-5xl hover:scale-110 transform transition"
              onClick={handleLogout}
              role="menuitem"
              tabIndex={0}
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
              role="menuitem"
              tabIndex={0}
            >
              Log In
            </li>
            <li
              className="cursor-pointer py-6 text-5xl hover:scale-110 transform transition"
              onClick={() => {
                handleNavClick('/');
                openSignUpModal();
              }}
              role="menuitem"
              tabIndex={0}
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