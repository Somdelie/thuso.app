"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "./Icon";
import { EyeIcon, LocateIcon, Pin } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { createJobApplicationAction } from "@/actions/application";

const CandidateJobCard = ({ jobItem, jobApplications, profileInfo }) => {
  const [showJobDetails, setShowJobDetails] = useState(false);

  console.log(profileInfo, "Profile");

  async function handleJobApplication() {
    await createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.candidateName,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: "Applied", // Status should be a string, not an array
        jobID: jobItem?.id,
        jobApplicationDate: new Date().toISOString(),
      },
      "/dashboard/jobs"
    );
    setShowJobDetails(false);
  }

  console.log(jobApplications, "jobApplications");

  return (
    <Drawer open={showJobDetails} onOpenChange={setShowJobDetails}>
      <Card className="hover:-translate-y-2 duration-300">
        <CardHeader>
          <CardTitle className=" w-full md:text-lg flex items-center gap-3 max-w-full text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
            <Icon />{" "}
            <span className="flex-grow w-full">
              {" "}
              {jobItem?.title?.substring(0, 25)}{" "}
            </span>
            <div className="text-sm text-sky-400">
              {jobItem.companyName ? (
                <p>{jobItem?.companyName?.substring(0, 45)}</p>
              ) : (
                <p>N/A</p>
              )}
            </div>
            {/* <span className="text-sm text-gray-400">10 applicants</span> */}
          </CardTitle>
          <CardDescription>
            {jobItem?.companyName?.substring(0, 45)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{jobItem?.description?.substring(0, 45)}...</p>
          <p className="text-xs text-muted-foreground">
            {jobItem?.location?.substring(0, 45)}...
          </p>
        </CardContent>
        <CardFooter>
          <DrawerTrigger>
            <Button className="w-full">
              <EyeIcon className="mr-2 h-4 w-4" /> View Job Details
            </Button>
          </DrawerTrigger>
        </CardFooter>
      </Card>
      <DrawerContent className="p-6">
        <DrawerHeader className="px-0">
          <div className="flex items-center justify-between">
            <DrawerTitle className="font-extrabold text-lg md:text-2xl capitalize">
              {jobItem?.title}
            </DrawerTitle>
            <div className="flex gap-3">
              <Button
                onClick={handleJobApplication}
                disabled={
                  jobApplications.findIndex(
                    (item) => item.jobID === jobItem?.id
                  ) > -1
                    ? true
                    : false
                }
              >
                {jobApplications.findIndex(
                  (item) => item.jobID === jobItem?.id
                ) > -1
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
            <p>{jobItem?.description}</p>
          </DrawerDescription>
        </DrawerHeader>
        <div>
          <p className="capitalize bg-gray-900 flex items-center justify-center text-gray-400 py-1 text-sm whitespace-nowrap rounded w-[100px]">
            {jobItem?.type}
          </p>
          {jobItem.location ? (
            <p className="flex gap-1 items-center my-2">
              <Pin className="text-red-500" size={16} />
              {jobItem?.location}
            </p>
          ) : (
            ""
          )}
          <div className="flex gap-2 overflow-x-auto">
            {jobItem?.skills?.split(",").map((skillItem, i) => (
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

export default CandidateJobCard;
