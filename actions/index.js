"use server";
import Application from "@/models/application";
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

export async function fetchJobsForCandidateAction() {
  await connectToDb();
  const result = await Job.find({});

  return JSON.parse(JSON.stringify(result));
}

//create job application
export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDb();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

//fetch job applications - candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
  await connectToDb();
  const result = await Application.find({ candidateUserID: candidateID });

  // console.log(result);
  return JSON.parse(JSON.stringify(result));
}

//fetch job applications - recruiter
export async function fetchJobApplicationsForRecruiter(recruiterID) {
  await connectToDb();
  const result = await Application.find({ recruiterUserID: recruiterID });

  // console.log(result.jobID);
  return JSON.parse(JSON.stringify(result));
}

//update job application
export async function updateJobApplication(data, pathToRevalidate) {
  await connectToDb();
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobApplicationDate,
  } = data;
  await Application.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobApplicationDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

//get candidate details by candidate ID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDb();
  const result = await Profile.findOne({ userId: currentCandidateID });

  return JSON.parse(JSON.stringify(result));
}
