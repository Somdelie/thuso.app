import Link from "next/link";
import React from "react";

const VisitorButton = () => {
  return (
    <div className="flex space-x-4">
      <Link className="pushable" href="#">
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front bg-sky-600">Find Candidates</span>
      </Link>
      <Link className="pushable" href="/jobs">
        <span className="shadow"></span>
        <span className="edge1 "></span>
        <span className="front bg-gray-700">Find Jobs</span>
      </Link>
    </div>
  );
};

export default VisitorButton;
