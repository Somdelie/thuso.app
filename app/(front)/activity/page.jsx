import {
  fetchApplicationsForCandidate,
  fetchJobApplicationsForCandidate,
  fetchJobsForCandidateByStatus,
} from "@/actions/application";
import {
  fetchApplicationsByStatus,
  fetchJobsByApplicationStatus,
  fetchJobsForCandidateAction,
} from "@/actions/create-job";
import { fetchProfile } from "@/actions/create-profile";
import { fetchProposalForCandidate } from "@/actions/hiringAction";
import CandidateActivity from "@/components/client/activity/CandidateActivity";
import prismaDB from "@/utils/dbConnect";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const ActivityPage = async () => {
  const user = await currentUser();
  // Fetch applications for the current candidate
  const applications = await fetchApplicationsForCandidate(user?.id);
  const profileInfo = await fetchProfile(user?.id);
  const jobs = await fetchProposalForCandidate(profileInfo?.id);

  return <CandidateActivity applications={applications} jobs={jobs} />;
};

export default ActivityPage;
