"use server";
import prismaDB from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(data, pathToRevalidate) {
  const categoryData = {
    ...data,
    jobs: {
      create: [],
    },
  };

  const result = await prismaDB.category.create({
    data: categoryData,
  });

  revalidatePath(pathToRevalidate);
  return result;
}

export async function fetchCategories() {
  const result = await prismaDB.category.findMany({
    include: { jobs: true },
  });

  return result;
}

export async function updateCategoryAction(data, id, pathToRevalidate) {
  const categoryData = {
    ...data,
  };

  const result = await prismaDB.category.update({
    where: { id },
    data: categoryData,
  });

  revalidatePath(pathToRevalidate);
  return result;
}
