/* eslint-disable react/no-unescaped-entities */
import { updateJobApplication } from "@/actions";
import { updateJobApplicationStatus } from "@/actions/application";
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
      .getPublicUrl(currentCandidateDetails?.resume);

    console.log(data, "resume");
    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdateJobStatus = async (status) => {
    const applicationId = jobApplications.find(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    )?.id;

    if (applicationId) {
      await updateJobApplicationStatus(applicationId, status, "/jobs");
      setShowCurrentCandidateDetailsModal(false); // Close the modal after updating the status
    }
  };

  const currentApplication = jobApplications.find(
    (item) => item.candidateUserID === currentCandidateDetails?.userId
  );

  const isSelected = currentApplication?.status.includes("Selected");
  const isRejected = currentApplication?.status.includes("Rejected");

  // console.log(jobApplications, "Job applications");

  return (
    <Dialog
      open={showCurrentCandidateDetailsModal}
      onOpenChange={() => {
        setCurrentCandidateDetails(null);
        setShowCurrentCandidateDetailsModal(false);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Here are details about{" "}
            <span className="font-semibold">
              {currentCandidateDetails?.fullName}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full">
            <h1>
              Name:{" "}
              <span className="font-semibold">
                {currentCandidateDetails?.fullName}
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
              {currentCandidateDetails?.companyName ? (
                <>{currentCandidateDetails?.companyName}</>
              ) : (
                "Individual"
              )}
            </span>
          </p>
          <div className="flex gap-2 overflow-x-auto">
            {currentCandidateDetails?.skills?.split(",").map((skillItem, i) => (
              <div
                key={i}
                className="w-[100px] flex items-center justify-center h-[35px] bg-black text-white rounded"
              >
                <p className="text-[13px] font-medium">{skillItem}</p>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handlePreviewResume}>Resume</Button>
          <Button
            onClick={() => handleUpdateJobStatus("Selected")}
            disabled={isSelected || isRejected}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
          <Button
            onClick={() => handleUpdateJobStatus("Rejected")}
            className="bg-red-600 text-white"
            disabled={isRejected}
          >
            {isRejected ? "Rejected" : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateModal;
