/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import PostNewJob from "./PostNewJob";
import RecruiterJobCard from "./RecruiterJobCard";
import CandidateJobCard from "./candidate-card";

const JobListing = ({ user, profileInfo, jobList, jobApplications }) => {
  console.log(jobApplications);

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">
            {profileInfo?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h1>
          <div className="flex items-center">
            {profileInfo?.role === "CANDIDATE" ? (
              <p>Filter</p>
            ) : (
              <PostNewJob profileInfo={profileInfo} user={user} />
            )}
          </div>
        </div>
        <div>
          <div className="pt-6  pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
              <div className="md:col-span-4">
                <div className="container mx-auto p-0 space-y-8">
                  <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                    {jobList && jobList.length > 0 ? (
                      jobList?.map((jobItem, i) =>
                        profileInfo?.role === "CANDIDATE" ? (
                          <CandidateJobCard
                            key={i}
                            jobItem={jobItem}
                            profileInfo={profileInfo}
                            jobApplications={jobApplications}
                          />
                        ) : (
                          <RecruiterJobCard
                            key={i}
                            jobItem={jobItem}
                            jobApplications={jobApplications}
                          />
                        )
                      )
                    ) : (
                      <div>You don't have any job yet</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
