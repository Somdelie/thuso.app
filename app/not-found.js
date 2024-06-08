import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center relative">
        <h1 className="text-9xl font-black">404</h1>
        <p className="text-2xl mt-4">Oops! Something went wrong.</p>
        <p className="text-lg mt-2">Error 404: Page Not Found</p>
        <Link href="/">
          <span className="mt-6 inline-block px-8 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition duration-300">
            Go to Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
