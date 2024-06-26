import { fetchProfile } from "@/actions/create-profile";
import Membership from "@/components/client/membership/Membership";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const MembershipPage = async () => {
  const user = await currentUser();

  const profileInfo = await fetchProfile(user?.id);
  if (!profileInfo) redirect("/onboard");

  return <Membership profileInfo={profileInfo} />;
};

export default MembershipPage;
