/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HeroButtons = ({ user, profileInfo }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="flex space-y-4 flex-wrap items-start space-x-4">
      <Button
        className="pushable"
        onClick={() =>
          router.push(
            user
              ? profileInfo?.role === "CANDIDATE"
                ? "/jobs"
                : "/candidates"
              : "/jobs"
          )
        }
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front bg-sky-600">
          {user
            ? profileInfo?.role === "CANDIDATE"
              ? "Browse Jobs"
              : "Candidates"
            : "Find Candidates"}
        </span>
      </Button>
      <Button
        className="pushable"
        href="/jobs"
        onClick={() =>
          router.push(
            user
              ? profileInfo?.role === "CANDIDATE"
                ? "/activity"
                : "/jobs"
              : "/browse"
          )
        }
      >
        <span className="shadow"></span>
        <span className="edge1 "></span>
        <span className="front bg-gray-700">
          {user
            ? profileInfo?.role === "CANDIDATE"
              ? "Your Activity"
              : "Post New Job"
            : "Post New Job"}
        </span>
      </Button>
    </div>
  );
};

export default HeroButtons;
