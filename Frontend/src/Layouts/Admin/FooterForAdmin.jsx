import React from "react";

const FooterForAdmin = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Title */}
          <div className="mb-4 md:mb-0">
            <a href="/" className="text-xl font-bold text-white">
              MyApp
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="hover:text-white text-sm font-medium"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-white text-sm font-medium"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="hover:text-white text-sm font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterForAdmin;
