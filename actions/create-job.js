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
    Category: {
      connect: { id: formData.Category },
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
    include: {
      applications: true,
      Category: true,
    },
  });

  return result;
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
    const { id, categoryId, ...dataToUpdate } = jobData; // Destructure to exclude the `id` field and handle Category separately

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
