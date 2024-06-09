"use server";
import prismaDB from "@/utils/dbConnect";

import { revalidatePath } from "next/cache";

export async function createJobApplicationAction(formData, pathToRevalidate) {
  const applicationData = {
    ...formData,
  };
  const application = await prismaDB.application.create({
    data: applicationData,
  });
  revalidatePath(pathToRevalidate);
  return application;
}

// update application status
export async function updateJobApplicationStatus(
  applicationId,
  status,
  pathToRevalidate
) {
  const updatedApplication = await prismaDB.application.update({
    where: { id: applicationId },
    data: { status },
  });
  revalidatePath(pathToRevalidate);
  // console.log(updatedApplication);
  return updatedApplication;
}

export async function fetchJobApplicationsForCandidate(id) {
  const result = await prismaDB.application.findMany({
    where: { candidateUserID: id },
  });

  // console.log(result);
  return result;
}

export async function fetchJobApplicationsForRecruiter(id) {
  const result = await prismaDB.application.findMany({
    where: { recruiterUserID: id },
  });

  // console.log(result);

  return result;
}
