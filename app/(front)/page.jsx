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
import { TransitionalText } from "@/components/common/TransitionalText";

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

  const TEXTS = [
    "The Only Freelance Job Platform You Will Need.",
    "We are dedicated to creating a world where freelancers and businesses can find their dream",
    "Find Your Dream Jobs With Only Few Clicks",
    "Your Unique Skillset Can Earn You money!",
    "We take the work out of looking for work",
    "Get the candidates you need, now",
  ];

  return (
    <div className="w-full">
      <section className="max-w-[100%] min-h-screen bg-heroBg">
        <div className="w-[90%] mx-auto">
          <div className="relative w-full">
            <div className="flex">
              <div className="container m-auto p-0">
                <div className="flex items-center flex-wrap gap-12 lg:gap-0">
                  <div className="lg:w-6/12 overflow-hidden space-y-8 h-full flex flex-col justify-between">
                    <span className="flex items-center space-x-2 mb-6">
                      <span className="block w-14 border-b-2 border-gray-700"></span>
                      <span className="font-medium text-gray-600">
                        One Stop Solution to Find Jobs
                      </span>
                    </span>
                    <TransitionalText
                      TEXTS={TEXTS}
                      className="text-gray-900 min-h-24 flex-shrink mb-6 text-xl md:text-3xl font-black leading-6"
                    />
                    {/* <h1 className="text-3xl font-bold text-sky-600 md:text-6xl">
                      Find Your <span>Dream Jobs</span> With Only Few Clicks
                    </h1> */}
                    <p className="text-xl text-gray-500 my-4">
                      Skip the headache and expense of opening up entities in
                      other countries. Remote does the hard work for you.
                    </p>
                    <HeroButtons
                      user={JSON.parse(JSON.stringify(user))}
                      profileInfo={profileInfo}
                    />
                  </div>
                  <div className="relative ml-auto">
                    <Image
                      src="/project.svg"
                      width={400}
                      height={400}
                      alt="Job Portal"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-8 bg-orangeBg">
          <div className="max-w-[90%] mx-auto py-8"></div>
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
