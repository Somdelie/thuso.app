import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DrawerTrigger } from "@/components/ui/drawer";
import Link from "next/link";
import React from "react";
import CandidateJobCard from "../jobs/candidate-card";

const PremiumJobs = ({
  featuredJobs,
  profileInfo,
  jobApplications,
  user,
  categories,
}) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 w-[90%] mx-auto">
      {featuredJobs?.map((jobItem) => (
        <CandidateJobCard
          key={jobItem?.id}
          user={user}
          categories={categories}
          jobItem={jobItem}
          profileInfo={profileInfo}
          jobApplications={jobApplications}
        />
      ))}
    </div>
  );
};

export default PremiumJobs;
