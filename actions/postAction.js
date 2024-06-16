"use server";
import prismaDB from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";

export async function createFeedPostAction(data, pathToRevalidate) {
  const postData = {
    ...data,
    likes: {
      create: [],
    },
  };

  const result = await prismaDB.feed.create({
    data: postData,
  });
  console.log(result);
  revalidatePath(pathToRevalidate);
  return result;
}

export async function createLikes() {}
