/* eslint-disable react/no-unescaped-entities */
import { updateJobApplication } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@supabase/supabase-js";
import React from "react";

const CandidateModal = ({
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  setCurrentCandidateDetails,
  currentCandidateDetails,
  jobApplications,
}) => {
  const supabaseClient = createClient(
    "https://lyfonawvuwlvyluvlokf.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Zm9uYXd2dXdsdnlsdXZsb2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3MDM0ODksImV4cCI6MjAzMzI3OTQ4OX0.NjIi1BkIEluw_y2YezB7Nf1F2jQo6mlbWCZ57-tcLcA"
  );

  const handlePreviewResume = () => {
    const { data } = supabaseClient.storage
      .from("thuso-com")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    // console.log(data, "resume");
    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdateJobStatus = async (getCurrentStatus) => {
    let cpyJobApplicants = [...jobApplications];
    const indexOfCurrentJobApplicant = cpyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );
    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfCurrentJobApplicant],
      status:
        cpyJobApplicants[indexOfCurrentJobApplicant].status.concat(
          getCurrentStatus
        ),
    };
    await updateJobApplication(jobApplicantsToUpdate, "/dashboard/jobs");
  };

  console.log(jobApplications);

  return (
    <Dialog
      open={showCurrentCandidateDetailsModal}
      onOpenChange={() => {
        setCurrentCandidateDetails(null);
        setShowCurrentCandidateDetailsModal(false);
      }}
    >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Here are details about{" "}
            <span className="font-semibold">
              {currentCandidateDetails?.candidateInfo?.name}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full">
            <h1>
              Name:{" "}
              <span className="font-semibold">
                {currentCandidateDetails?.candidateInfo?.name}
              </span>
            </h1>
          </div>
          <div className="w-full">
            Email:{" "}
            <span className="font-semibold">
              {currentCandidateDetails?.email}
            </span>
          </div>
          <p>
            {" "}
            Company:{" "}
            <span className="font-semibold">
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </span>
          </p>
          <p>
            {" "}
            Total Experience:{" "}
            <span className="font-semibold">
              {currentCandidateDetails?.candidateInfo?.totalExperience} Years
            </span>
          </p>
          <p>
            {" "}
            Salary:{" "}
            <span className="font-semibold">
              $ {currentCandidateDetails?.candidateInfo?.currentSalary} / hour
            </span>
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handlePreviewResume}>Resume</Button>
          <Button
            onClick={() => handleUpdateJobStatus("selected")}
            disabled={
              jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("selected") ||
              jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("rejected")
                ? true
                : false
            }
          >
            {jobApplications
              .find(
                (item) =>
                  item.candidateUserID === currentCandidateDetails?.userId
              )
              ?.status.includes("selected")
              ? "Selected"
              : "Select"}
          </Button>
          <Button
            disabled={
              jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("selected") ||
              jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("rejected")
                ? true
                : false
            }
            onClick={() => handleUpdateJobStatus("rejected")}
            className="bg-red-600 text-white"
          >
            {jobApplications
              .find(
                (item) =>
                  item.candidateUserID === currentCandidateDetails?.userId
              )
              ?.status.includes("rejected")
              ? "Rejected"
              : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateModal;
