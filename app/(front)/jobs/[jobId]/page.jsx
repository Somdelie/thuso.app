import { getJobId } from "@/actions/create-job";
import React from "react";
import { format } from "date-fns";
import { CalendarMonth, LocationOff } from "@mui/icons-material";
import { LocateIcon } from "lucide-react";

const SingleJobPage = async ({ params }) => {
  // console.log(params, "This is param");

  const job = await getJobId(params.jobId);

  const formattedDate = job?.createdAt
    ? format(new Date(job.createdAt), "PP")
    : "N/A";

  return (
    <div className="max-w-[90%] mx-auto flex flex-col gap-4 min-h-[70vh] py-6">
      <h2 className="text-xl font-semibold">{job?.title}</h2>
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
