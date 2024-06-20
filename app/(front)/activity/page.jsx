import { fetchApplicationsForCandidate } from "@/actions/application";
import { fetchProfile } from "@/actions/create-profile";
import { fetchProposalForCandidate } from "@/actions/hiringAction";
import CandidateActivity from "@/components/client/activity/CandidateActivity";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const ActivityPage = async () => {
  const user = await currentUser();
  // Fetch applications for the current candidate
  const applications = await fetchApplicationsForCandidate(user?.id);

  const jobs = await fetchProposalForCandidate();

  return <CandidateActivity applications={applications} jobs={jobs} />;
};

export default ActivityPage;
