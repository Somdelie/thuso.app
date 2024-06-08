"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityCard from "./ActivityCard";

const CandidateActivity = ({ jobList, jobApplicants }) => {
  const uniqueStatusArray = [
    ...new Set(
      jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
    ),
  ];
  //   console.log(uniqueStatusArray);

  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline justify-between border-b pb-6 pt-24">
          <h1 className="font-bold text-lg">Your Activity</h1>
          <TabsList>
            {uniqueStatusArray?.map((status, i) => (
              <TabsTrigger value={status} key={i}>
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="pb-24 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <div className="flex flex-col gap-4">
              {uniqueStatusArray?.map((status, i) => (
                <TabsContent key={i} value={status}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {jobList
                      .filter(
                        (jobItem) =>
                          jobApplicants
                            .filter(
                              (jobApplication) =>
                                jobApplication.status.indexOf(status) > -1
                            )
                            .findIndex(
                              (filteredItemByStatus) =>
                                jobItem?._id === filteredItemByStatus?.jobID
                            ) > -1
                      )
                      .map((finalFilteredItem, i) => (
                        <ActivityCard
                          key={i}
                          finalFilteredItem={finalFilteredItem}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default CandidateActivity;
