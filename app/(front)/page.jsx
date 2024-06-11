import { fetchProfile } from "@/actions/create-profile";
import HeroButtons from "@/components/common/HeroButtons";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  // getting logged-in user from clerk
  const user = await currentUser();

  // we define user profile patties
  const profileInfo = await fetchProfile(user?.id);

  // console.log(profileInfo);

  if (user && !profileInfo?.id) redirect("/onboard");

  return (
    <section className="min-h-[75vh]">
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
  );
}
