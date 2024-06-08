"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "./Icon";
import { EyeIcon, LocateIcon, Pin } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
const CandidateJobCard = ({ job }) => {
  const [showJobDetails, setShowJobDetails] = useState(false);
  return (
    <Drawer open={showJobDetails} onOpenChange={setShowJobDetails}>
      <Card className="hover:-translate-y-2 duration-300">
        <CardHeader>
          <CardTitle className="text-lg w-full md:text-xl flex items-center gap-3 max-w-full text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
            <Icon />{" "}
            <span className="flex-grow w-full">
              {" "}
              {job?.title?.substring(0, 45)}{" "}
            </span>
            <div className="text-sm text-sky-400">
              {job.companyName ? (
                <p>{job?.companyName?.substring(0, 45)}</p>
              ) : (
                <p>N/A</p>
              )}
            </div>
            {/* <span className="text-sm text-gray-400">10 applicants</span> */}
          </CardTitle>
          <CardDescription>
            {job?.companyName?.substring(0, 45)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{job?.description}</p>
          <p>{job?.location?.substring(0, 45)}...</p>
          <div className="">
            <h4 className="font-semibold">Skills Needed</h4>
            <p>{job?.skills}</p>
          </div>
        </CardContent>
        <CardFooter>
          <DrawerTrigger>
            <Button className="w-full">
              <EyeIcon className="mr-2 h-4 w-4" /> View Job Details
            </Button>
          </DrawerTrigger>
        </CardFooter>
      </Card>
      <DrawerContent className="p-6">
        <DrawerHeader className="px-0">
          <div className="flex items-center justify-between">
            <DrawerTitle className="font-extrabold text-lg md:text-2xl capitalize">
              {job?.title}
            </DrawerTitle>
            <div className="flex gap-3">
              <Button>Apply</Button>
              <Button
                onClick={() => setShowJobDetails(false)}
                className="bg-red-600 hover:bg-red-500 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
          <DrawerDescription>
            <p>{job?.description}</p>
          </DrawerDescription>
        </DrawerHeader>
        <div>
          <p className="capitalize bg-gray-900 flex items-center justify-center text-gray-400 py-1 text-sm whitespace-nowrap rounded w-[100px]">
            {job?.type} Time
          </p>
          {job.location ? (
            <p className="flex gap-1 items-center my-2">
              <Pin className="text-red-500" size={16} />
              {job?.location}
            </p>
          ) : (
            ""
          )}
          <div className="flex gap-2 overflow-x-auto">
            {job?.skills?.split(",").map((skillItem, i) => (
              <div
                key={i}
                className="w-[100px] flex items-center justify-center h-[35px] bg-black text-white rounded"
              >
                <p className="text-[13px] font-medium">{skillItem}</p>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CandidateJobCard;
