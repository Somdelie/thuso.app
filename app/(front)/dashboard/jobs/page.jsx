import {
  fetchJobApplicationsForCaRecruiter,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfile,
} from "@/actions";
import JobListing from "@/components/client/jobs/JobListing";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const JobPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  const jobList =
    profileInfo?.role === "candidate"
      ? await fetchJobsForCandidateAction()
      : await fetchJobsForRecruiterAction(user?.id);

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id);

  // console.log(profileInfo);
  // console.log(jobList);

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
