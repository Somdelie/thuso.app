import JobListing from "@/components/client/jobs/JobListing";
import {
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
} from "@/actions/application";
import { fetchCategories } from "@/actions/categoryAction";
import {
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
} from "@/actions/create-job";
import { fetchProfile } from "@/actions/create-profile";
import { currentUser } from "@clerk/nextjs/server";

const BrowseJobsPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  const jobList =
    profileInfo?.role === "CANDIDATE"
      ? await fetchJobsForCandidateAction(user?.id)
      : await fetchJobsForRecruiterAction(user?.id);

  const getJobApplicationList =
    profileInfo?.role === "CANDIDATE"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id);

  const categories = await fetchCategories();

  return (
    <div className="max-w-[90%] mx-auto">
      <JobListing
        user={JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
        jobList={jobList}
        categories={categories}
        jobApplications={getJobApplicationList}
      />
    </div>
  );
};

export default BrowseJobsPage;
