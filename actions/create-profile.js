"use server";
import prismaDB from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";

// Create a new profile
export async function createProfile(data, pathToRevalidate) {
  const { recruiterInfo, candidateInfo, ...rest } = data;

  // Flatten and map the fields according to the Prisma schema
  const profileData = {
    ...rest,
  };

  // console.log(profileData, "this is the data to be created");

  // Uncomment these lines to actually create the profile in the database
  const profile = await prismaDB.profile.create({
    data: profileData,
  });

  revalidatePath(pathToRevalidate);
  console.log(profile, "Profile created successfully");
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

  revalidatePath(pathToRevalidate);
  return profile;
}

// Update a profile
export async function updatedProfile(userId, pathToRevalidate) {
  const profile = await prismaDB.profile.update({
    where: { id: userId },
    data: {
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      isPremiumUser: true,
      memberShipType: planId,
      memberShipStartDate: new Date(),
    },
  });

  revalidatePath(pathToRevalidate);
  return profile;
}

// Update profile admin function
export async function updatedProfileAdmin(
  rowId,
  dataToUpdate,
  pathToRevalidate
) {
  try {
    const { id, candidateJobs, ...restData } = dataToUpdate; // Extract candidateJobs if needed

    const updatedProfile = await prismaDB.profile.update({
      where: { id: rowId },
      data: {
        ...restData, // Update other fields
        candidateJobs: {
          // Handle candidateJobs update if necessary
          // Use appropriate nested update/connect operations as needed
          // Example:
          // connect: candidateJobs.map(job => ({ id: job.id })) // Connect existing candidateJobs
          // updateMany: candidateJobs.map(job => ({ where: { id: job.id }, data: { ...job } })) // Update existing candidateJobs
        },
      },
    });

    revalidatePath(pathToRevalidate);

    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
}

export async function getAllProfiles() {
  const profiles = await prismaDB.profile.findMany({
    include: {
      candidateJobs: true,
    },
  });
  // console.log(profiles, "Jobs profile");
  return profiles;
}
export async function getAllCandidates() {
  const profiles = await prismaDB.profile.findMany({
    where: { role: "CANDIDATE" },
    include: {
      candidateJobs: true,
    },
  });
  // console.log(profiles, "Jobs profile");
  return profiles;
}

export async function getPremiumJobs() {
  const profiles = await prismaDB.profile.findMany({
    where: {
      role: "RECRUITER",
    },
    include: {
      jobs: true,
    },
  });
  console.log(profiles, "Jobs profile");
  return profiles;
}
