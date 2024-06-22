"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";

const TopRated = ({ premiumProfile }) => {
  const router = useRouter();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 w-[90%] mx-auto">
      {premiumProfile?.map((profile) => (
        <Card className="hover:-translate-y-2 duration-300" key={profile?.id}>
          <CardHeader>
            <CardTitle className=" w-full md:text-lg flex items-center gap-3 max-w-full text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
              <span className="title text-sm capitalize">
                {profile?.fullName.title?.substring(0, 25)}
              </span>
            </CardTitle>
            <CardDescription>
              <span className="text">
                {profile?.preferredJobLocation?.substring(0, 18)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto">
              {profile?.skills
                ?.split(",")
                .slice(0, 3)
                .map((skillItem, i) => (
                  <div key={i}>
                    <p className="text-[13px] font-medium">{skillItem}</p>
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Hire Me</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TopRated;
