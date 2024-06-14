import {
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
} from "@/actions/application";
import {
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
} from "@/actions/create-job";
import { fetchProfile } from "@/actions/create-profile";
import JobListing from "@/components/client/jobs/JobListing";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const JobPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  const jobList =
    profileInfo?.role === "CANDIDATE"
      ? await fetchJobsForCandidateAction(user?.id)
      : await fetchJobsForRecruiterAction(user?.id);

  console.log(profileInfo, "This is profile info");

  const getJobApplicationList =
    profileInfo?.role === "CANDIDATE"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id);

  const fetchFilterCategories = await fetchJobsForCandidateAction();

  if (!user) redirect("/sign-in");
  if (user && !profileInfo) redirect("/onboard");

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={getJobApplicationList}
    />
  );
};

export default JobPage;
