import { fetchJobsForRecruiterAction, fetchProfile } from "@/actions";
import JobListing from "@/components/client/jobs/JobListing";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const JobPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);
  const jobList = await fetchJobsForRecruiterAction(user?.id);

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
    />
  );
};

export default JobPage;
