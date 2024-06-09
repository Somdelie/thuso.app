/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogContent } from "@radix-ui/react-dialog";
import React, { Fragment } from "react";
import CandidateModal from "./candidate-modal";
import { getCandidateDetailsByID } from "@/actions/candidateActions";

const CandidateList = ({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  jobApplications,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) => {
  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByID(getCurrentCandidateId);

    console.log(data);

    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  }

  //   console.log(currentCandidateDetails);

  return (
    <Fragment>
      <div className="grid grid-cols-1 relative gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {jobApplications && jobApplications.length > 0
          ? jobApplications.map((jobApplicantItem, i) => (
              <div
                key={i}
                className="bg-white shadow w-full max-w-sm rounded overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-6">
                  <h3 className="text-lg font-bold">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        jobApplicantItem?.candidateUserID
                      )
                    }
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <CandidateModal
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        currentCandidateDetails={currentCandidateDetails}
        jobApplications={jobApplications}
      />
    </Fragment>
  );
};

export default CandidateList;
