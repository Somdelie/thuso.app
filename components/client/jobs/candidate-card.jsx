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
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const CandidateJobCard = ({
  jobItem,
  jobApplications,
  profileInfo,
  user,
  categories,
}) => {
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
        recruiterUserID: jobItem?.recruiterId,
        fullName: profileInfo?.fullName,
        email: profileInfo?.email,
        candidateUserID: profileInfo?.userId,
        status: "Applied", // Status should be a string, not an array
        jobID: jobItem?.id,
        jobApplicationDate: new Date().toISOString(),
      },
      "/jobs"
    );
    setShowJobDetails(false);
  }

  const isApplied =
    jobApplications.findIndex((item) => item.jobID === jobItem?.id) > -1;

  return (
    <Drawer open={showJobDetails} onOpenChange={setShowJobDetails}>
      <Card className="hover:-translate-y-2 duration-300">
        <CardHeader>
          <CardTitle className="relative w-full md:text-lg flex items-center gap-3 max-w-full text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
            <Icon />{" "}
            <Link className="" href={`/jobs/${jobItem?.id}`}>
              <span className="flex-grow flex items-center gap-1 w-full">
                {" "}
                {jobItem?.title?.substring(0, 25)}{" "}
                <EyeIcon className="mr-2 h-4 w-4" />
              </span>
            </Link>
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
          {!profileInfo ? (
            <Link
              className="bg-gray-900 text-white hover:opacity-90 py-2 rounded w-full flex items-center justify-center"
              href={`/jobs/${jobItem?.id}`}
            >
              View Job Details
            </Link>
          ) : (
            <>
              {profileInfo?.role !== "CANDIDATE" ? (
                <Link
                  className="bg-gray-900 text-white hover:opacity-90 py-2 rounded w-full flex items-center justify-center"
                  href={`/jobs/${jobItem?.id}`}
                >
                  View Job Details
                </Link>
              ) : (
                <DrawerTrigger>
                  <Button className="w-full" disabled={isApplied}>
                    {isApplied ? "Already Applied" : "Apply Now"}
                  </Button>
                </DrawerTrigger>
              )}
            </>
          )}
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
