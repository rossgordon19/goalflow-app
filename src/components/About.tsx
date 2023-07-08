import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center h-screen pt-10 md:pt-20 lg:pt-32 text-center px-4 lg:px-32 bg-[#eef7fb] text-[#004449]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-10">Shape Your Future with GoalFlow</h1>
      <div className="w-full flex flex-col md:flex-row justify-center items-center md:space-x-4 flex-grow">
        <div className="bg-[#004449] px-4 py-8 rounded-md m-2 h-[50vh] md:h-[50vh] flex items-center justify-center w-full md:w-1/3">
          <h2 className="text-[#d7ffc2] text-xl">Card 1</h2>
        </div>
        <div className="bg-[#004449] px-4 py-8 rounded-md m-2 h-[50vh] md:h-[50vh] flex items-center justify-center w-full md:w-1/3">
          <h2 className="text-[#d7ffc2] text-xl">Card 2</h2>
        </div>
        <div className="bg-[#004449] px-4 py-8 rounded-md m-2 h-[50vh] md:h-[50vh] flex items-center justify-center w-full md:w-1/3">
          <h2 className="text-[#d7ffc2] text-xl">Card 3</h2>
        </div>
      </div>
    </div>
  );
};

export default About;
