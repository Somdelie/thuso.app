import { fetchCategories } from "@/actions/categoryAction";
import {
  fetchProfile,
  getAllProfiles,
  getPremiumJobs,
} from "@/actions/create-profile";
import {
  getFeaturedJobs,
  getGoldCandidates,
  getPremiumCandidates,
} from "@/actions/homePageAction";
import PremiumJobs from "@/components/client/home/PremiumJobs";
import TopRated from "@/components/client/home/TopRated";
import HeroButtons from "@/components/common/HeroButtons";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import {
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
} from "@/actions/application";
import { redirect } from "next/navigation";

export default async function Home() {
  // getting logged-in user from clerk
  const user = await currentUser();
  const premiumProfile = await getPremiumCandidates();
  const goldProfile = await getGoldCandidates();
  const featuredJobs = await getFeaturedJobs();
  // we define user profile patties
  const profileInfo = await fetchProfile(user?.id);

  // console.log(goldJobs, "Premium jobs");

  if (user && !profileInfo?.id) redirect("/onboard");

  const getJobApplicationList =
    profileInfo?.role === "CANDIDATE"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id);

  const categories = await fetchCategories();

  return (
    <div className="w-full">
      <section className="max-w-[90%] mx-auto min-h-[75vh]">
        <div className="bg-white">
          <div className="relative w-full">
            <div className="min-h-screen flex">
              <div className="container m-auto p-0">
                <div className="flex items-center flex-wrap gap-12 lg:gap-0">
                  <div className="lg:w-5/12 space-y-8">
                    <span className="flex items-center space-x-2">
                      <span className="block w-14 border-b-2 border-gray-700"></span>
                      <span className="font-medium text-gray-600">
                        One Stop Solution to Find Jobs
                      </span>
                    </span>
                    <h1 className="text-3xl font-bold text-sky-600 md:text-6xl">
                      The Best <br /> Job Portal App
                    </h1>
                    <p className="text-xl text-gray-700">
                      Find Best Jobs From Top Product Based Companies and Build
                      Your Career
                    </p>
                    <HeroButtons
                      user={JSON.parse(JSON.stringify(user))}
                      profileInfo={profileInfo}
                    />
                  </div>
                  <div className="relative ml-auto">
                    <Image
                      src="/project.svg"
                      width={500}
                      height={500}
                      alt="Job Portal"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-gradient-to-b from-gray-100 via-white to-gray-100 py-8 rounded-t-[20px]">
        <div className="w-[90%] mx-auto my-4">
          <h2 className="font-semibold text-2xl underline">
            Recommend Candidates
          </h2>
        </div>
        <TopRated premiumProfile={premiumProfile} />
      </section>
      <section className="w-full bg-white py-8 ">
        <div className="w-[90%] mx-auto my-4">
          <h2 className="font-semibold text-2xl underline">Recommend Jobs</h2>
        </div>
        <PremiumJobs
          featuredJobs={featuredJobs}
          user={JSON.parse(JSON.stringify(user))}
          profileInfo={profileInfo}
          categories={categories}
          jobApplications={getJobApplicationList}
        />
      </section>
      <section className="w-full bg-white py-8 ">
        <div className="w-[90%] mx-auto my-4">
          <h2 className="font-semibold text-2xl underline">
            Most Viewed Candidates
          </h2>
        </div>
        <TopRated premiumProfile={goldProfile} />
      </section>
    </div>
  );
}
