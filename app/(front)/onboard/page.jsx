import Onboard from "@/components/client/on-board/Onboard";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfile } from "@/actions/create-profile";
import { fetchCategories, fetchSubcategories } from "@/actions/categoryAction";

const OnBoardPage = async () => {
  //get the auth user from clerk
  const user = await currentUser();
  const categories = await fetchCategories();

  //fetch the profile info -> either user is candidate / user is recruiter

  const profileInfo = await fetchProfile(user?.id);
  const subCategories = await fetchSubcategories();

  // console.log(profileInfo?.role);

  if (profileInfo?.id) {
    if (profileInfo?.role === "RECRUITER" && !profileInfo.isPremiumUser)
      redirect("/membership");
    else redirect("/");
  } else
    return (
      <div className="bg-heroBg w-full min-h-[55vh]">
        <Onboard categories={categories} subCategories={subCategories} />
      </div>
    );
};

export default OnBoardPage;
