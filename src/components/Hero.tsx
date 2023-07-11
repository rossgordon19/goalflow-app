import { useState } from 'react';
import SignUpModal from './SignUpModal';
import Goals from '../assets/goals.svg';

// Styles object
const styles = {
  heroContainer:
    'flex flex-col justify-center items-center h-screen bg-[#004449] text-[#d7ffc2]',
  container:
    'container mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-6',
  leftContainer: 'w-full md:w-1/2 flex flex-col items-center md:items-start',
  header:
    'text-6xl lg:text-6xl xl:text-8xl font-bold mb-4 text-center md:text-left',
  slogan:
    'text-2xl md:text-2xl lg:text-4xl xl:text-6xl text-[#ffac7e] text-center md:text-left',
  signUpButton:
    'bg-[#0eff80] border-2 border-[#0eff80] hover:bg-[#004449] hover:border-[#0eff80] text-black hover:text-[#0eff80] px-4 py-4 font-bold text-lg md:text-xl rounded-full mt-8 md:mx-0',
  rightContainer:
    'w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0',
  goalsImage: 'w-[90%] md:w-[90%] lg:h-[80%] lg:w-[80%] h-auto',
};

const Hero = () => {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <h1 className={styles.header}>GoalFlow</h1>
            <p className={styles.slogan}>Your future starts here.</p>
            <button
              className={styles.signUpButton}
              onClick={openSignUpModal}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  openSignUpModal();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Open Sign Up Modal"
            >
              Sign Up
            </button>
          </div>
          <div className={styles.rightContainer}>
            <img
              src={Goals}
              className={styles.goalsImage}
              alt="Abstract art representing GoalFlow"
            />
          </div>
        </div>
      </div>
      {isSignUpModalOpen && (
        <SignUpModal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal} />
      )}
    </>
  );
};

export default Hero;
