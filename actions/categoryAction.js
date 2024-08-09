"use server";
import prismaDB from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";

export async function deleteCategoryAction(id, pathToRevalidate) {
  const result = await prismaDB.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
  return result;
}

export async function createCategoryAction(data) {
  const categoryData = {
    ...data,
    jobs: {
      create: [],
    },
  };

  const result = await prismaDB.category.create({
    data: categoryData,
  });

  revalidatePath("/admin/categories");
  return result;
}

export async function fetchCategories() {
  const result = await prismaDB.category.findMany({
    include: { jobs: true, subCategories: true, profiles: true },
  });
  console.log(result, "Categories fetched successfully");
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

// export async function deleteCategoryAction(id) {
//   const result = await prismaDB.category.delete({
//     where: { id },
//   });
//   revalidatePath("/admin/categories");
//   return result;
// }

export async function createSubcategoryAction(data, title, pathToRevalidate) {
  const subcategoryData = {
    subcategoryName: data.subCategoryName,
    Category: {
      connect: { id: data.categoryId },
    },

    jobs: {
      create: [],
    },
    profiles: {
      create: [],
    },
  };
  console.log(subcategoryData, "this is your subcategory data");
  const result = await prismaDB.subcategory.create({
    data: subcategoryData,
  });

  revalidatePath(pathToRevalidate);
  return result;
}

export async function fetchSubcategories() {
  const result = await prismaDB.subcategory.findMany({
    include: { jobs: true, profiles: true },
  });
  return result;
}

export async function fetchSubcategoriesByCategoryId(categoryId) {
  const result = await prismaDB.subcategory.findMany({
    where: { categoryId },
    include: { jobs: true, profiles: true },
  });
  return result;
}

export async function updateSubcategoryAction(
  data,
  subcategoryId,
  pathToRevalidate
) {
  const subcategoryData = {
    subcategoryName: data.subcategoryName,
  };

  const result = await prismaDB.subcategory.update({
    where: { id: subcategoryId },
    data: subcategoryData,
  });

  revalidatePath(pathToRevalidate);
  return result;
}

export async function deleteSubcategoryAction(subcategoryId, pathToRevalidate) {
  const result = await prismaDB.subcategory.delete({
    where: { id: subcategoryId },
  });
  revalidatePath(pathToRevalidate);
  return result;
}
