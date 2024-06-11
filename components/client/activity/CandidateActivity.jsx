"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityCard from "./ActivityCard";

const CandidateActivity = ({ applications }) => {
  // const appliedJobs = applications.filter((app) => app.status === "Applied");
  const selectedJobs = applications.filter((app) => app.status === "Selected");
  const rejectedJobs = applications.filter((app) => app.status === "Rejected");

  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline justify-between border-b pb-6 pt-24">
          <h1 className="font-bold text-lg">Your Activity</h1>
          <TabsList>
            <TabsTrigger value="Applied">Applied</TabsTrigger>
            <TabsTrigger value="Selected">Selected</TabsTrigger>
            <TabsTrigger value="Rejected">Rejected</TabsTrigger>
          </TabsList>
        </div>
        <div className="pb-24 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <div className="flex flex-col gap-4">
              <TabsContent value="Applied">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {applications.length < 1 ? (
                    <div className="w-full text-center flex items-center justify-center font-semibold">
                      No Applied Jobs Yet
                    </div>
                  ) : (
                    applications.map((application) => (
                      <ActivityCard
                        key={application.id}
                        job={application.job}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="Selected">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedJobs.length < 1 ? (
                    <div className="w-full text-center flex items-center justify-center font-semibold">
                      No Selected Jobs Yet
                    </div>
                  ) : (
                    selectedJobs.map((application) => (
                      <ActivityCard
                        key={application.id}
                        job={application.job}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
              <TabsContent value="Rejected">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {rejectedJobs.length < 1 ? (
                    <div className="w-full text-center flex items-center justify-center font-semibold">
                      No Rejected Jobs Yet
                    </div>
                  ) : (
                    rejectedJobs.map((application) => (
                      <ActivityCard
                        key={application.id}
                        job={application.job}
                      />
                    ))
                  )}
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default CandidateActivity;
