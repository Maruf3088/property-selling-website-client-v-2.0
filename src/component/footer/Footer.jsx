import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-[#050505] text-gray-400 border-t border-white/5 relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="hidden sm:block absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Section */}
      <footer className="container mx-auto flex flex-col md:grid md:grid-cols-3 justify-between py-12 sm:py-16 px-4 sm:px-6 lg:px-10 gap-8 sm:gap-10 relative z-10">
        {/* Quick Links */}
        <div>
          <h6 className="text-lg sm:text-xl font-bold mb-6 text-white tracking-wide">
            Quick Links
          </h6>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-property"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Properties
              </Link>
            </li>
            <li>
              <Link
                to="/all-agency"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Agencies
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h6 className="text-lg sm:text-xl font-bold mb-6 text-white tracking-wide">
            Account
          </h6>
          <ul className="space-y-3">
            <li>
              <Link
                to="/login"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/favourites"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                My Favourites
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="text-lg sm:text-xl font-bold mb-6 text-white tracking-wide">
            Legal
          </h6>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Terms of use
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Privacy policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-sm sm:text-base hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform"
              >
                Cookie policy
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* Bottom Section */}
      <footer className="bg-[#020202] border-t border-white/5 relative z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 sm:py-8 px-4 sm:px-6 lg:px-10 gap-4">
          {/* Logo / Company Info */}
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <img
              src={logo}
              className="w-24 sm:w-32 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              alt="Logo"
            />
            <p className="text-gray-600 text-xs sm:text-sm border-l border-white/10 pl-4">
              Providing reliable real estate since 1992
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <div className="bg-white/5 text-gray-400 rounded-full p-2 sm:p-3 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer border border-white/5 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20">
              <FaFacebook size={16} />
            </div>
            <div className="bg-white/5 text-gray-400 rounded-full p-2 sm:p-3 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer border border-white/5 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20">
              <FaInstagram size={16} />
            </div>
            <div className="bg-white/5 text-gray-400 rounded-full p-2 sm:p-3 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer border border-white/5 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20">
              <FaLinkedin size={16} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
