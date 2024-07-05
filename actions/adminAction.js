import prismaDB from "@/utils/dbConnect";

// Fetch recent jobs with count
export async function getRecentJobs() {
  const recentJobs = await prismaDB.job.findMany({
    include: {
      Category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const jobCountThisWeek = await prismaDB.job.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
  });

  const jobCountLastWeek = await prismaDB.job.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  return { recentJobs, jobCountThisWeek, jobCountLastWeek };
}

// Fetch recent profiles with count
export async function getRecentProfiles() {
  const recentProfiles = await prismaDB.profile.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const profileCountThisMonth = await prismaDB.profile.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  const profileCountLastMonth = await prismaDB.profile.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setMonth(new Date().getMonth() - 2)),
        lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  });

  return { recentProfiles, profileCountThisMonth, profileCountLastMonth };
}
