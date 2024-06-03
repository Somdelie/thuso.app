"use server";
import Profile from "@/models/profileSchema";
import connectToDb from "@/utils/data";
import { revalidatePath } from "next/cache";

// create profile action
export async function createProfile(formData, pathToRevalidate) {
  await connectToDb();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}

export async function fetchProfile(id) {
  await connectToDb();
  const result = await Profile.findOne({ userId: id });

  return JSON.parse(JSON.stringify(result));
}
