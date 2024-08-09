import {
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
} from "@/actions/application";
import { fetchCategories, fetchSubcategories } from "@/actions/categoryAction";
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
      : await fetchJobsForRecruiterAction(profileInfo?.id);

  const getJobApplicationList =
    profileInfo?.role === "CANDIDATE"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(profileInfo?.id);

  const categories = await fetchCategories();
  const subCategories = await fetchSubcategories();

  if (!user) redirect("/browse");

  // console.log(jobList, "Jobs");

  return (
    <div className="max-w-[90%] mx-auto">
      <JobListing
        user={JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
        jobList={jobList}
        categories={categories}
        subCategories={subCategories}
        jobApplications={getJobApplicationList}
      />
    </div>
  );
};

export default JobPage;
