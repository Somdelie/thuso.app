"use client";

import { updateProfile } from "@/actions/create-profile";
import Form from "@/components/common/Form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useEffect, useState } from "react";

const AccountInfo = ({ profileInfo }) => {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  useEffect(() => {
    if (profileInfo?.role === "RECRUITER") setRecruiterFormData(profileInfo);
    if (profileInfo?.role === "CANDIDATE") setCandidateFormData(profileInfo);
  }, [profileInfo]);

  const handleUpdateAccount = async () => {
    const dataToUpdate =
      profileInfo?.role === "CANDIDATE"
        ? {
            // userId: profileInfo?.userId,
            email: candidateFormData.email,
            fullName: candidateFormData.fullName,
            resume: candidateFormData.resume,
            preferredJobLocation: candidateFormData.preferredJobLocation,
            companyName: candidateFormData.companyName,
            skills: candidateFormData.skills,
            isPremiumUser: candidateFormData.isPremiumUser,
            memberShipType: candidateFormData.memberShipType,
            memberShipStartDate: candidateFormData.memberShipStartDate,
            memberShipEndDate: candidateFormData.memberShipEndDate,
            // Add additional candidate fields if necessary
          }
        : {
            // userId: profileInfo?.userId,
            role: recruiterFormData.role,
            email: recruiterFormData.email,

            recruiterName: recruiterFormData.recruiterName,
            isPremiumUser: recruiterFormData.isPremiumUser,
            memberShipType: recruiterFormData.memberShipType,
            memberShipStartDate: recruiterFormData.memberShipStartDate,
            memberShipEndDate: recruiterFormData.memberShipEndDate,
            // Add additional recruiter fields if necessary
          };

    await updateProfile(profileInfo?.id, dataToUpdate, "/account");
  };

  return (
    <div className=" pb-6  pt-14">
      <h2 className="font-bold tracking-tight text-gray-950">
        Account Details
      </h2>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <Form
            action={handleUpdateAccount}
            formControls={
              profileInfo?.role === "CANDIDATE"
                ? candidateOnboardFormControls.filter(
                    (formControl) =>
                      formControl.name !== "resume" &&
                      formControl.name !== "documentPhoto"
                  )
                : recruiterOnboardFormControls
            }
            formData={
              profileInfo?.role === "CANDIDATE"
                ? candidateFormData
                : recruiterFormData
            }
            setFormData={
              profileInfo?.role === "CANDIDATE"
                ? setCandidateFormData
                : setRecruiterFormData
            }
            buttonText="Update Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
