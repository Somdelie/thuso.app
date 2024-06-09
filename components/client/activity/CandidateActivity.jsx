"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityCard from "./ActivityCard";

const CandidateActivity = ({ jobList, jobApplicants }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="select" className="w-full">
        <div className="flex items-baseline justify-between border-b pb-6 pt-24">
          <h1 className="font-bold text-lg">Your Activity</h1>
          <TabsList>g</TabsList>
        </div>
        <div className="pb-24 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <div className="flex flex-col gap-4">r</div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default CandidateActivity;
