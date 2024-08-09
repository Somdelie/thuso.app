import { fetchProfile } from "@/actions/create-profile";
import AccountInfo from "@/components/client/account/AccountInfo";
import CandidateAccount from "@/components/client/account/CandidateAccount";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AccountPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  if (!user) redirect("/sign-in");
  if (!profileInfo) redirect("/onboard");

  // console.log(profileInfo, "this is the profile info");

  return (
    <div className="max-w-[90%] mx-auto py-8">
      {profileInfo?.role === "CANDIDATE" ? (
        <CandidateAccount profileInfo={profileInfo} />
      ) : (
        <div>Recruiter</div>
      )}
    </div>
  );
};

export default AccountPage;
