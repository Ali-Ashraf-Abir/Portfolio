import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent font-nunito">
      <div className=" mx-auto px-4 sm:px-6 lg:px-[5vw]">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-[#AE445A] font-bold text-[4vh]">Portfolio</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-[#F2A07B] font-bold text-[2vh]">
            <a href="#" className="hover:text-gray-300">
              Home
            </a>


            <button
              onClick={() => scrollToSection("contact")}
              className=""
            >
              Contact
            </button>

            <a
              href="resume.pdf"
              download="Ali_Ashraf_Abir_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg hover:text-gray-300"
            >
              Download Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 bg-opacity-90">
          <a
            href="#"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >
            Home
          </a>

          <a
            href="#contact"
            className="block px-4 py-2 text-white hover:bg-gray-700"
          >

            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
