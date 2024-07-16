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
import Hero from "@/components/client/home/Hero";
import { Briefcase, DollarSign, Globe, Users } from "lucide-react";

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

  const heroInfo = [
    {
      icon: <Briefcase size={42} />,
      heading: "Find Jobs",
      subheading: "Discover thousands of job opportunities.",
    },
    {
      icon: <Users size={42} />,
      heading: "Top Candidates",
      subheading: "Hire from a pool of top-tier candidates.",
    },
    {
      icon: <Globe size={42} />,
      heading: "Global Reach",
      subheading: "Access jobs and candidates worldwide.",
    },
    {
      icon: <DollarSign size={42} />,
      heading: "Competitive Salaries",
      subheading: "Find jobs that pay what you deserve.",
    },
  ];

  const TEXTS = [
    "The Only Freelance Job Platform You Will Need.",
    // "We are dedicated to creating a world where freelancers and businesses can find their dream",
    "Find Your Dream Jobs With Only Few Clicks",
    "Your Unique Skillset Can Earn You money!",
    "We take the work out of looking for work",
    "Get the candidates you need, now",
  ];

  return (
    <div className="w-full">
      <section className="max-w-[100%] min-h-screen bg-heroBg">
        <Hero TEXTS={TEXTS} user={user} profileInfo={profileInfo} />
        <div className="w-full py-8 bg-orangeBg">
          <div className="max-w-[90%] grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 mx-auto">
            {heroInfo?.map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex-shrink-0">{item?.icon}</div>
                  <div className="">
                    <h2 className="font-bold">{item?.heading}</h2>
                    <span className="text-sm text-gray-200">
                      {item?.subheading}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
