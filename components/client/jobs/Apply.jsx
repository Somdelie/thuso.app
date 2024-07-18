"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Pin } from "lucide-react";
import { createJobApplicationAction } from "@/actions";

const Apply = ({ job, profileInfo, jobApplications }) => {
  const [showJobDetails, setShowJobDetails] = useState(false);

  const { toast } = useToast();
  // console.log(profileInfo.fullName, "Profile");

  async function handleJobApplication() {
    if (!profileInfo?.isPremiumUser && jobApplications.length >= 2) {
      toast({
        variant: "destructive",
        title: "Please Get Membership",
        description:
          "You can apply the max of 2 jobs unless you opt for membership",
      });
      return;
    }

    await createJobApplicationAction(
      {
        recruiterUserID: job?.recruiterId,
        fullName: profileInfo?.fullName,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: "Applied", // Status should be a string, not an array
        jobID: job?.id,
        jobApplicationDate: new Date().toISOString(),
      },
      "/jobs"
    );
    setShowJobDetails(false);
  }

  if (jobApplications.findIndex((item) => item.jobID === job?.id) > -1)
    return null;

  return (
    <Drawer>
      {" "}
      <DrawerTrigger>
        <Button
          className="w-full"
          disabled={
            jobApplications.findIndex((item) => item.jobID === job?.id) > -1
              ? true
              : false
          }
        >
          Apply Now
        </Button>
      </DrawerTrigger>{" "}
      <DrawerContent className="p-6">
        <DrawerHeader className="px-0">
          <div className="flex items-center justify-between">
            <DrawerTitle className="font-extrabold text-lg md:text-2xl capitalize">
              {job?.title}
            </DrawerTitle>
            <div className="flex gap-3">
              <Button
                onClick={handleJobApplication}
                disabled={
                  jobApplications.findIndex((item) => item.jobID === job?.id) >
                  -1
                    ? true
                    : false
                }
              >
                {jobApplications.findIndex((item) => item.jobID === job.id) > -1
                  ? "Applied"
                  : "Apply"}
              </Button>
              <Button
                onClick={() => setShowJobDetails(false)}
                className="bg-red-600 disabled:opacity-65 hover:bg-red-500 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
          <DrawerDescription>
            <p>{job?.description}</p>
          </DrawerDescription>
        </DrawerHeader>
        <div>
          <p className="capitalize bg-gray-900 flex items-center justify-center text-gray-400 py-1 text-sm whitespace-nowrap rounded w-[100px]">
            {job?.type}
          </p>
          {job.location ? (
            <p className="flex gap-1 items-center my-2">
              <Pin className="text-red-500" size={16} />
              {job?.location}
            </p>
          ) : (
            ""
          )}
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
      </DrawerContent>
    </Drawer>
  );
};

export default Apply;
