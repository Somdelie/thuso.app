"use server";
import prismaDB from "@/utils/dbConnect";
import { generateSlug } from "@/utils/generateSlug";
import { revalidatePath } from "next/cache";

// Create a new job
export async function postNewJobAction(data, pathToRevalidate) {
  const { categoryId, subcategoryId, profileId, title, ...rest } = data;

  const slug = generateSlug(title);

  const jobData = {
    isFeatured: false,
    applications: {
      create: [],
    },
    ...rest,
    categoryId: categoryId,
    subcategoryId: subcategoryId,
    profileId: profileId,
    slug: slug,
  };

  console.log(jobData, "this is the data to be created");

  const job = await prismaDB.job.create({
    data: jobData,
  });

  revalidatePath(pathToRevalidate);
  return job;
}

// Fetch jobs for a recruiter
export async function fetchJobsForRecruiterAction(id) {
  try {
    console.log(`Fetching jobs for recruiter ID: ${id}`);
    const result = await prismaDB.job.findMany({
      where: {
        recruiterId: id,
      },
      // Uncomment these lines if you need related data
      include: {
        applications: true,
        Category: true,
      },
    });
    console.log(`Fetched jobs for recruiter:`, result);
    return result;
  } catch (error) {
    console.error(`Error fetching jobs for recruiter ID ${id}:`, error);
    throw new Error("Failed to fetch jobs for recruiter");
  }
}

// Fetch all jobs
export async function fetchAllJobs(searchParams = {}) {
  const { title, skill } = searchParams;

  // console.log("Search Params:", searchParams); // Log the search parameters

  const result = await prismaDB.job.findMany({
    where: {
      OR: [
        {
          title: {
            contains: title || "",
            mode: "insensitive",
          },
        },
        {
          skills: {
            contains: skill || "",
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      Category: true,
    },
  });

  // console.log("Result:", result); // Log the result of the query

  return result;
}
// Fetch all jobs for candidates
export async function fetchJobsForCandidateAction(searchParams = {}) {
  const { title, skill } = searchParams;

  // console.log("Search Params:", searchParams); // Log the search parameters

  const result = await prismaDB.job.findMany({
    where: {
      OR: [
        {
          title: {
            contains: title || "",
            mode: "insensitive",
          },
        },
        {
          skills: {
            contains: skill || "",
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      Category: true,
    },
  });

  // console.log("Result:", result); // Log the result of the query

  return result;
}

export async function getJobId(jobId) {
  const result = await prismaDB.job.findUnique({
    where: {
      id: jobId,
    },
  });

  return result;
}

// Delete a job
export async function deleteJobAction(jobId, pathToRevalidate) {
  try {
    const job = await prismaDB.job.delete({
      where: {
        id: jobId,
      },
    });

    revalidatePath(pathToRevalidate);
    return job;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job");
  }
}

// Edit a job
export async function editJobAction(rowId, jobData, pathToRevalidate) {
  console.log(jobData, "Job data");
  try {
    const { id, profileId, categoryId, ...dataToUpdate } = jobData; // Destructure to exclude the `id` field and handle Category separately

    const job = await prismaDB.job.update({
      where: {
        id: rowId,
      },
      data: {
        ...dataToUpdate,
        Category: {
          connect: { id: categoryId },
        },
      },
    });

    revalidatePath(pathToRevalidate);

    return job;
  } catch (error) {
    console.error("Error updating job:", error);
    throw new Error("Failed to update job");
  }
}
