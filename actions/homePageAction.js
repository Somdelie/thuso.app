import prismaDB from "@/utils/dbConnect";

export async function getPremiumCandidates() {
  const result = await prismaDB.profile.findMany({
    where: {
      isApproved: true,
      isPremiumUser: true,
      role: "CANDIDATE",
      memberShipType: "Premium",
    },
  });
  return result;
}

export async function getGoldCandidates() {
  const result = await prismaDB.profile.findMany({
    where: {
      isApproved: true,
      isPremiumUser: true,
      role: "CANDIDATE",
      OR: [{ memberShipType: "Premium" }, { memberShipType: "Gold" }],
    },
  });
  return result;
}

export async function getFeaturedJobs() {
  const result = await prismaDB.job.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      Profile: true,
    },
  });
  // console.log(result, "Featured Jobs");
  return result;
}
