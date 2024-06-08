import {
  fetchJobApplicationsForCandidate,
  fetchJobsForCandidateAction,
} from "@/actions";
import CandidateActivity from "@/components/client/activity/CandidateActivity";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const ActivityPage = async () => {
  const user = await currentUser();
  const jobList = await fetchJobsForCandidateAction();
  const jobApplicants = await fetchJobApplicationsForCandidate(user?.id);

  return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />;
};

export default ActivityPage;
