import { getJobId } from "@/actions/create-job";
import { format } from "date-fns";
import { ArrowBack, CalendarMonth, LocationOff } from "@mui/icons-material";
import { LocateIcon, Pin } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfile } from "@/actions/create-profile";

import { createJobApplicationAction } from "@/actions/application";
import Apply from "@/components/client/jobs/Apply";
import Link from "next/link";

const SingleJobPage = async ({ params }) => {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  const job = await getJobId(params.jobId);

  const formattedDate = job?.createdAt
    ? format(new Date(job.createdAt), "PP")
    : "N/A";

  return (
    <div className="max-w-[90%] mx-auto flex flex-col gap-4 min-h-[70vh] py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{job?.title}</h2>
        {!profileInfo ? (
          <span className="text-red-600">Log in to apply for this job</span>
        ) : (
          <Link href="/jobs">
            <ArrowBack />
            Go back to apply
          </Link>
        )}
      </div>
      <div className="text-sm text-sky-400">
        {job.companyName ? <p>{job?.companyName}</p> : <p>N/A</p>}
      </div>
      <p>{job?.type}</p>
      <p className="text-gray-500 flex items-center gap-1">
        <LocateIcon size={24} className="text-red-500" />
        {job?.location}
      </p>
      <p className="text-muted-foreground">
        <CalendarMonth />
        {formattedDate}
      </p>
      <p className="text-muted-foreground">{job?.description}</p>
      <div className="flex gap-2 overflow-x-auto">
        {job?.skills?.split(",").map((skillItem, i) => (
          <div
            key={i}
            className="w-[100px] flex items-center justify-center h-[35px] bg-black text-white rounded"
          >
            <p className="text-[13px] font-medium">{skillItem}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleJobPage;
