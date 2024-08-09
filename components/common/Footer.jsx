import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-heroBg">
      <div className="max-w-[90%] border-t-2 pt-6 mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <Link className="hidden md:flex items-center mr-6 gap-1" href="/">
              <Image
                src="/t-logo.png"
                alt="logo"
                width={20}
                height={40}
                className="aspect-auto"
              />
              <h2 className="text-orangeBg drop-shadow-md text-xl font-black transition hover:underline">
                THUSOO
              </h2>
            </Link>
            <p className="mt-2 text-gray-400">
              Connecting talent with opportunity.
            </p>
          </div>

          {/* Links */}
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <ul className="mt-2">
              <li className="mt-1">
                <Link href="/about" className="text-gray-600 hover:text-main">
                  About Us
                </Link>
              </li>
              <li className="mt-1">
                <Link href="/contact" className="text-gray-600 hover:text-main">
                  Contact
                </Link>
              </li>
              <li className="mt-1">
                <Link href="/terms" className="text-gray-600 hover:text-main">
                  Terms of Service
                </Link>
              </li>
              <li className="mt-1">
                <Link href="/privacy" className="text-gray-600 hover:text-main">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h5 className="text-lg font-semibold">Follow Us</h5>
            <div className="flex justify-center md:justify-end mt-2 space-x-4">
              <Link
                href="https://facebook.com"
                className="bg-blue-600 text-white p-2 rounded-full hover:scale-110 transition duration-75 hover:bg-blue-700"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="https://twitter.com"
                className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500"
              >
                <FaXTwitter />
              </Link>
              <Link
                href="https://instagram.com"
                className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white p-2 rounded-full hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Thusoo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
