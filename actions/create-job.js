"use server";
import prismaDB from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";

// Create a new job
export async function postNewJobAction(formData, pathToRevalidate) {
  const jobData = {
    ...formData,
    applications: {
      create: [],
    },
  };

  const job = await prismaDB.job.create({
    data: jobData,
  });

  revalidatePath(pathToRevalidate);
  return job;
}

// Fetch jobs for a recruiter
export async function fetchJobsForRecruiterAction(id) {
  const result = await prismaDB.job.findMany({
    where: {
      recruiterId: id,
    },
    include: { applications: true },
  });

  return result;
}

// Fetch all jobs for candidates
export async function fetchJobsForCandidateAction() {
  const result = await prismaDB.job.findMany();
  return result;
}
