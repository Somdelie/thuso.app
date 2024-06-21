import prismaDB from "@/utils/dbConnect";

export async function getPremiumCandidates() {
  const result = await prismaDB.profile.findMany({
    where: {
      role: "CANDIDATE",
      memberShipType: "Premium",
    },
  });
  return result;
}
