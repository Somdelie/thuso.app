"use client";

import { updateProfile } from "@/actions/create-profile";
import Form from "@/components/common/Form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";

const AccountInfo = ({ profileInfo }) => {
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isIdLoading, setIsIdLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
            avatarUrl: candidateFormData.avatarUrl,
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
            companyName: recruiterFormData.companyName,
            fullName: recruiterFormData.fullName,
            isPremiumUser: recruiterFormData.isPremiumUser,
            memberShipType: recruiterFormData.memberShipType,
            memberShipStartDate: recruiterFormData.memberShipStartDate,
            memberShipEndDate: recruiterFormData.memberShipEndDate,
            // Add additional recruiter fields if necessary
          };

    await updateProfile(profileInfo?.id, dataToUpdate, "/account");
  };

  return (
    <div className=" pb-6 max-w-[90%] mx-auto pt-12">
      <h2 className="font-bold text-2xl md:text-3xl mb-2 tracking-tight text-gray-950">
        Your Account Details
      </h2>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2">
            {isAvatarLoading ? (
              <div className="flex items-center">
                <span className="italic font-semibold text-green-600">
                  Uploading please wait...
                </span>
                <div className="loader-image ml-auto mr-auto"></div>
              </div>
            ) : (
              <>
                <div className="gap-2 flex items-center">
                  <label className=" text-gray-500 text-sm font-bold">
                    Avatar Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) =>
                        handleAvatarFileChange(e, setAvatar, "avatar")
                      }
                      className="hidden"
                      id="avatarInput"
                    />
                    <div
                      className="w-24 h-24 border-dotted border-2 border-orangeBg rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        document.getElementById("avatarInput").click()
                      }
                    >
                      {profileInfo?.avatarUrl ? (
                        <Image
                          src={profileInfo?.avatarUrl}
                          width={500}
                          height={500}
                          alt="Avatar"
                          className="w-full h-full rounded-full aspect-auto object-cover"
                        />
                      ) : (
                        <span className="text-sky-400 relative">
                          <FaCamera size={24} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {isIdLoading ? (
              <div className="flex items-center">
                <span className="italic font-semibold text-green-600">
                  Uploading please wait...
                </span>
                <div className="loader-image ml-auto mr-auto"></div>
              </div>
            ) : (
              <div className="gap-2 flex items-center">
                <label className=" text-gray-500 text-sm font-bold">
                  ID Document
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) =>
                      handleIdFileChange(e, setIdDocument, "idUrl")
                    }
                    className="hidden"
                    id="idDocumentInput"
                  />
                  <div
                    className="w-24 h-24 border-dotted border-2 overflow-hidden border-orangeBg rounded flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      document.getElementById("idDocumentInput").click()
                    }
                  >
                    {profileInfo?.idUrl ? (
                      <Image
                        src={profileInfo?.idUrl}
                        width={500}
                        height={500}
                        alt="ID Document"
                        className="w-full h-full aspect-auto object-cover"
                      />
                    ) : (
                      <span className="text-sky-400 relative">
                        <Image
                          src="/document.jpg"
                          width={500}
                          height={500}
                          alt="ID Document"
                          className="w-full h-full object-cover"
                        />
                        <FaCamera
                          className="absolute -bottom-2 -right-2"
                          size={24}
                        />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Form
            action={handleUpdateAccount}
            formControls={
              profileInfo?.role === "CANDIDATE"
                ? candidateOnboardFormControls.filter(
                    (formControl) =>
                      formControl.name !== "avatarUrl" &&
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
