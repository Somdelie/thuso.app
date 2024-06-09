"use server";
import prismaDB from "@/utils/dbConnect";

export async function getCandidateDetailsByID(currentCandidateID) {
  const currentCandidate = await prismaDB.profile.findFirst({
    where: {
      userId: currentCandidateID,
    },
  });
  // console.log(currentCandidate);
  return currentCandidate;
}
