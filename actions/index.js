"use server";
import Job from "@/models/job";
import Profile from "@/models/profileSchema";
import connectToDb from "@/utils/data";
import { revalidatePath } from "next/cache";

// create profile action
export async function createProfile(formData, pathToRevalidate) {
  await connectToDb();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}

//fetch profile action
export async function fetchProfile(id) {
  await connectToDb();
  const result = await Profile.findOne({ userId: id });

  return JSON.parse(JSON.stringify(result));
}
// create job action
export async function postNewJobAction(formData, pathToRevalidate) {
  await connectToDb();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

//fetch job action
//recruiter jobs
export async function fetchJobsForRecruiterAction(id) {
  await connectToDb();
  const result = await Job.find({ recruiterId: id });

  return JSON.parse(JSON.stringify(result));
}
