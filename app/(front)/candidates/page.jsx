import { fetchProfile } from "@/actions/create-profile";
import Candidates from "@/components/client/candidates/Candidates";
import prismaDB from "@/utils/dbConnect";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CandidatesPage = async () => {
  const candidates = await prismaDB.profile.findMany({
    where: { role: "CANDIDATE" },
  });

  const user = await currentUser();

  const profileInfo = await fetchProfile(user?.id);

  if (!profileInfo) redirect("/onboard");

  // console.log(candidates);

  return (
    <div className="max-w-[90%] mx-auto">
      <Candidates
        candidates={candidates}
        user={JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
      />
    </div>
  );
};

export default CandidatesPage;
