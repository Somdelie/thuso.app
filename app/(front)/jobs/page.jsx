import {
  fetchJobApplicationsForCaRecruiter,
  fetchJobApplicationsForCandidate,
  fetchJobsForCandidateAction,
  fetchProfile,
} from "@/actions";
import CandidateJobCard from "@/components/client/jobs/CandidateJobCard";
import { currentUser } from "@clerk/nextjs/server";

const JobsPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);
  const jobList = await fetchJobsForCandidateAction();

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForCaRecruiter(user?.id);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          Explore All Jobs
        </h1>
      </div>
      <div className="grid grid-cols-1 pt-8 md:grid-cols-3 gap-4">
        {jobList?.map((job, i) => (
          <CandidateJobCard
            key={i}
            job={job}
            profileInfo={profileInfo}
            jobApplications={getJobApplicationList}
          />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
