/* eslint-disable react/no-unescaped-entities */
import HeroButtons from "@/components/common/HeroButtons";
import { TransitionalText } from "@/components/common/TransitionalText";
import Image from "next/image";
import React from "react";

const Hero = ({ TEXTS, user, profileInfo }) => {
  return (
    <div className="w-[90%] mx-auto py-4 min-h-[70vh]">
      {/* <CarouselSpacing categories={categories} /> */}
      <div className="relative w-full">
        <div className="flex">
          <div className="mx-auto p-0">
            <div className="grid pt-10 gap-4 md:grid-cols-2 lg:gap-6">
              <div className="flex flex-col gap-2 justify-center">
                <h1 className=" text-myText flex items-start flex-wrap gap-2 text-2xl font-bold !leading-[1.208] text-dark sm:text-[25px] lg:text-[33px]">
                  Connecting Skilled{" "}
                  <TransitionalText
                    TEXTS={TEXTS}
                    className="text-orange-600 whitespace-nowrap"
                  />
                  <br />
                </h1>
                <h1 className="text-myText flex items-start flex-wrap gap-2 text-2xl font-bold !leading-[1.208] text-dark sm:text-[25px] lg:text-[33px]">
                  with Daily Opportunities
                </h1>
                <p className=" text-base text-gray-600 italic">
                  At <span className="font-semibold">THUSOO.</span> Our
                  innovative platform is designed for everyone—whether you're
                  seeking long-term career opportunities or one-off gigs. We
                  serve both professionals and non-professionals, individuals
                  and companies, making the process of finding the right job or
                  perfect candidate seamless and efficient.
                </p>
                <HeroButtons user={user} profileInfo={profileInfo} />
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
