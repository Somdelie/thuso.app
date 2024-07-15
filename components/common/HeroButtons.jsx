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
    <div className="w-full gap-4 grid grid-cols-2">
      <Button
        className=" w-full"
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
        {user
          ? profileInfo?.role === "CANDIDATE"
            ? "Browse Jobs"
            : "Candidates"
          : "Find Candidates"}
      </Button>
      <Button
        className=""
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
        {user
          ? profileInfo?.role === "CANDIDATE"
            ? "Your Activity"
            : "Post New Job"
          : "Post New Job"}
      </Button>
    </div>
  );
};

export default HeroButtons;
