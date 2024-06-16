"use server";

import prismaDB from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";

export async function createProposalFeedAction(data, pathToRevalidate) {
  const result = await prismaDB.candidateJobs.create({
    data,
  });
  revalidatePath(pathToRevalidate);
  return result;
}

export async function fetchProposalForCandidate(id) {
  const result = await prismaDB.candidateJobs.findMany({
    where: {
      profileId: id,
    },
  });
  console.log(result);
  return result;
}
