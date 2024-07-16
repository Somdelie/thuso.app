import HeroButtons from "@/components/common/HeroButtons";
import { TransitionalText } from "@/components/common/TransitionalText";
import Image from "next/image";
import React from "react";

const Hero = ({ TEXTS, user, profileInfo }) => {
  return (
    <div className="w-[90%] mx-auto py-4 min-h-[75vh]">
      <div className="relative w-full">
        <div className="flex">
          <div className=" mx-auto p-0">
            <div className="grid pt-10 gap-4 md:grid-cols-2 lg:gap-6">
              <div className="w-full overflow-hidden relative h-full flex flex-col ">
                <span className="h-[300px] w-[300px] right-0 absolute rounded-full hero-span"></span>
                {/* <span className="flex items-center space-x-2 mb-6">
                <span className="block w-14 border-b-2 border-gray-700"></span>
                <span className="font-medium text-gray-600">
                  One Stop Solution to Find Jobs
                </span>
              </span> */}
                <TransitionalText
                  TEXTS={TEXTS}
                  className="text-myText min-h-24 flex-shrink text-xl md:text-4xl font-black md:mt-8 leading-6"
                />
                {/* <h1 className="text-3xl font-bold text-sky-600 md:text-6xl">
                Find Your <span>Dream Jobs</span> With Only Few Clicks
              </h1> */}
                <p className="text-xl z-10 text-gray-500 mb-6">
                  Skip the headache and expense of opening up entities in other
                  countries. Remote does the hard work for you.
                </p>
                <HeroButtons
                  user={JSON.parse(JSON.stringify(user))}
                  profileInfo={profileInfo}
                />
              </div>
              <div className="relative w-full flex gap-4 items-end">
                <Image
                  src="/hero-image.png"
                  width={500}
                  height={500}
                  alt="Job Portal"
                  className="w-full h-full"
                />
                <Image
                  src="/black-man.png"
                  width={500}
                  height={500}
                  alt="Job Portal"
                  className="absolute bottom-1 -left-[10%] w-[85%] h-[105%]"
                />
                <div className=""></div>
                <div className="">
                  <Image
                    src="/woman1.png"
                    width={200}
                    height={200}
                    alt="Job Portal"
                    className="absolute bottom-1 right-[10px] w-[40%] h-[70%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
