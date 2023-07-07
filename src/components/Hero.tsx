import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SignUpModal from './SignUpModal';
import Goals from '../assets/goals.svg';

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
      <div className="flex flex-col justify-center items-center h-screen bg-[#004449] text-[#d7ffc2]">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:space-x-6">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <h1 className="text-6xl lg:text-6xl xl:text-8xl font-bold mb-4 text-center md:text-left">
              GoalFlow
            </h1>
            <p className="text-2xl md:text-2xl lg:text-4xl xl:text-6xl text-[#ffac7e] text-center md:text-left">
              Your future starts here.
            </p>
            <button
              className="bg-[#0eff80] border-2 border-[#0eff80] hover:bg-[#004449] hover:border-[#0eff80] text-black hover:text-[#0eff80] px-4 py-4 font-bold text-lg md:text-xl rounded-full mt-8 md:mx-0"
              onClick={openSignUpModal}
            >
              Sign Up
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
            <img
              src={Goals}
              className="w-[90%] md:w-[90%] lg:h-[80%] lg:w-[80%] h-auto"
              alt="GoalFlow"
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

Hero.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Hero;
