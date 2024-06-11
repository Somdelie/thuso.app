/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, EyeIcon } from "lucide-react";
import React, { useState } from "react";
import Icon from "./Icon";
import JobApplicants from "./JobApplicants";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const RecruiterJobCard = ({ jobItem, jobApplications }) => {
  const applicantCount = jobApplications.filter(
    (item) => item.jobID === jobItem?.id
  ).length;

  // console.log(jobItem);

  const [showApplicantDrawers, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" w-full md:text-lg max-w-full text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
          <div className="flex items-center justify-between">
            <Icon /> <span className="text-sm text-gray-400"></span>
          </div>
          <span className="flex-grow w-full">
            {" "}
            {jobItem?.title.substring(0, 25)}{" "}
          </span>
        </CardTitle>
        <CardDescription>
          {jobItem?.description.substring(0, 45)}...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={applicantCount < 1}
          onClick={() => setShowApplicantsDrawer(true)}
        >
          {applicantCount} Applicants
        </Button>
        <JobApplicants
          showApplicantDrawers={showApplicantDrawers}
          setShowApplicantsDrawer={setShowApplicantsDrawer}
          showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
          setShowCurrentCandidateDetailsModal={
            setShowCurrentCandidateDetailsModal
          }
          currentCandidateDetails={currentCandidateDetails}
          setCurrentCandidateDetails={setCurrentCandidateDetails}
          jobItem={jobItem}
          jobApplications={jobApplications.filter(
            (jobApplicationItem) => jobApplicationItem.jobID === jobItem?.id
          )}
        />
      </CardFooter>
    </Card>
  );
};

export default RecruiterJobCard;
