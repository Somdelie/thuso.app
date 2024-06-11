"use server";
import prismaDB from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";

// Create a new job application
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

// Update application status
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
  return updatedApplication;
}

// Fetch job applications for a candidate
export async function fetchJobApplicationsForCandidate(id) {
  const result = await prismaDB.application.findMany({
    where: { candidateUserID: id },
    include: { job: true },
  });

  return result;
}

// Fetch job applications for a recruiter
export async function fetchJobApplicationsForRecruiter(id) {
  const result = await prismaDB.application.findMany({
    where: { recruiterUserID: id },
    include: { job: true },
  });

  return result;
}

// Fetch applications for a candidate with job details
export async function fetchApplicationsForCandidate(candidateId) {
  const result = await prismaDB.application.findMany({
    where: { candidateUserID: candidateId },
    include: {
      job: true, // Include the job details
    },
  });

  return result;
}
