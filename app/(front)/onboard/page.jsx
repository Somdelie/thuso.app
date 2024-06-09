import Onboard from "@/components/client/on-board/Onboard";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfile } from "@/actions/create-profile";

const OnBoardPage = async () => {
  //get the auth user from clerk
  const user = await currentUser();

  //fetch the profile info -> either user is candidate / user is recruiter

  const profileInfo = await fetchProfile(user?.id);

  // console.log(profileInfo?.role);

  if (profileInfo?.id) {
    if (profileInfo?.role === "RECRUITER" && !profileInfo.isPremiumUser)
      redirect("/membership");
    else redirect("/");
  } else return <Onboard />;
};

export default OnBoardPage;
