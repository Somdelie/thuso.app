"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import Head from "./Head";
import HireModal from "./HireModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Candidates = ({ candidates, user, profileInfo }) => {
  const [openHireModal, setOpenHireModal] = useState(false);

  const handleCandidateHire = () => {};

  return (
    <div className="grid gap-6 py-2">
      <Head />
      {candidates?.length > 0 ? (
        <div className="grid md:grid-cols-2 w-full gap-6">
          {candidates?.map((candidate) => (
            <Card key={candidate?.id} className="w-full">
              <CardHeader>
                <div className="flex items-center gap-4 border-b py-4">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <div className="flex w-full items-center justify-between">
                      <h2 className="flex-grow font-semibold">
                        {" "}
                        {candidate?.fullName}
                      </h2>
                      <div className="float-end flex items-center gap-2">
                        <span className="h-4 w-4 bg-emerald-500 rounded-full"></span>
                        <p>available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="w-[100%]">
                <h2 className="font-semibold py-2">Services</h2>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full pl-4 md:pl-0"
                >
                  <CarouselContent className="w-1/2 md:w-full">
                    {candidate?.skills?.split(",").map((skillItem, i) => (
                      <CarouselItem
                        key={i}
                        className=" md:basis-1/2 md:pl-4 lg:basis-1/3"
                      >
                        <div className="p-1">
                          <p className=" font-medium text-white rounded py-2 bg-sky-700  text-center">
                            {skillItem}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:block disabled:hidden" />
                  <CarouselNext className="hidden md:block disabled:hidden" />
                </Carousel>
              </CardContent>
              <CardFooter>
                {profileInfo.role !== "CANDIDATE" && (
                  <>
                    <Button onClick={() => setOpenHireModal(true)}>
                      Hire Me
                    </Button>
                    <HireModal
                      handleCandidateHire={handleCandidateHire}
                      setOpenHireModal={setOpenHireModal}
                      candidate={candidate}
                      profileInfo={profileInfo}
                      openHireModal={openHireModal}
                      user={user}
                    />
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex w-full min-h-[55vh] items-center justify-center">
          <h3 className="font-semibold text-2xl">No candidates found!</h3>
        </div>
      )}
    </div>
  );
};

export default Candidates;
