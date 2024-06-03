import { fetchProfile } from "@/actions";
import Onboard from "@/components/client/on-board/Onboard";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const OnBoardPage = async () => {
  //get the auth user from clerk
  const user = await currentUser();

  //fetch the profile info -> either user is candidate / user is recruiter

  const profileInfo = await fetchProfile(user?.id);

  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser)
      redirect("/membership");
    else redirect("/");
  } else return <Onboard />;
};

export default OnBoardPage;
