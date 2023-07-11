import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full h-[100px] flex items-center justify-center flex-col bg-[#004449] text-[#d7ffc2]">
      <div className="flex space-x-4">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-200 hover:text-[#32cd32]"
          aria-label="Link to Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-200 hover:text-[#32cd32]"
          aria-label="Link to Twitter"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-200 hover:text-[#32cd32]"
          aria-label="Link to Facebook"
        >
          <FaFacebookF size={24} />
        </a>
      </div>
      <p className="mt-2">&copy; GoalFlow 2023</p>
    </footer>
  );
};

export default Footer;
