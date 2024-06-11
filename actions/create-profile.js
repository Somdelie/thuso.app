"use server";
import prismaDB from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";

// Create a new profile
export async function createProfile(data, pathToRevalidate) {
  const { recruiterInfo, candidateInfo, ...rest } = data;

  // Flatten and map the fields according to the Prisma schema
  const profileData = {
    ...rest,
    recruiterName: recruiterInfo?.name,
    recruiterCompanyName: recruiterInfo?.companyName,
    recruiterCompanyRole: recruiterInfo?.companyRole,
    documentPhoto: candidateInfo?.documentPhoto,
    resume: candidateInfo?.resume,
    candidateName: candidateInfo?.name,
    currentCompany: candidateInfo?.currentCompany,
    currentJobLocation: candidateInfo?.currentJobLocation,
    preferredJobLocation: candidateInfo?.preferredJobLocation,
    currentSalary: candidateInfo?.currentSalary,
    noticePeriod: candidateInfo?.noticePeriod,
    skills: candidateInfo?.skills,
    totalExperience: candidateInfo?.totalExperience,
    collegeLocation: candidateInfo?.collegeLocation,
    graduatedYear: candidateInfo?.graduatedYear,
    linkedinProfile: candidateInfo?.linkedinProfile,
    isCandidatePremium: candidateInfo?.isCandidatePremium,
  };

  const profile = await prismaDB.profile.create({
    data: profileData,
  });
  revalidatePath(pathToRevalidate);

  // console.log(profileData);
  return profile;
}

// Fetch a profile by userId
export async function fetchProfile(userId) {
  const profile = await prismaDB.profile.findFirst({
    where: { userId },
  });
  // console.log(userId);
  return profile;
}

// Update a profile
export async function updateProfile(userId, data, pathToRevalidate) {
  const profile = await prismaDB.profile.update({
    where: { id: userId },
    data,
  });

  // console.log(profile);

  revalidatePath(pathToRevalidate);
  return profile;
}
