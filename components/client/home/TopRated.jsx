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
import { Avatar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCity } from "react-icons/fa6";

const TopRated = ({ premiumProfile }) => {
  const router = useRouter();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 w-[90%] mx-auto">
      {premiumProfile?.map((profile) => (
        <Card className="hover:-translate-y-2 duration-300" key={profile?.id}>
          <CardHeader>
            <Image
              src={profile?.avatarUrl}
              width={100}
              height={100}
              alt={profile?.fullName.charAt(1)}
            />
            <CardTitle className=" w-full md:text-lg flex items-center justify-between gap-3 max-w-full text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
              <span className="title text-sm capitalize">
                {profile?.fullName?.substring(0, 25)}
              </span>
              <span className="text-sm flex items-center font-normal gap-2 text-gray-400">
                <FaCity />
                {profile?.city?.substring(0, 18)}
              </span>
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {profile?.skills.slice(0, 3).map((skill, i) => (
                <div
                  key={i}
                  className="border px-2 py-1 text-muted-foreground rounded"
                >
                  <p className="text-[13px] font-medium">{skill}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="">Hire Me</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TopRated;
