"use client";
import React, { useState, useEffect } from "react";
import PostNewJob from "./PostNewJob";
import RecruiterJobCard from "./RecruiterJobCard";
import CandidateJobCard from "./candidate-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const JobListing = ({
  user,
  profileInfo,
  jobList,
  jobApplications,
  categories,
}) => {
  const [filteredJobs, setFilteredJobs] = useState(jobList);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let jobs = jobList;

    if (selectedCategory !== "all") {
      jobs = jobs.filter(
        (job) => job.Category && job.Category.categoryName === selectedCategory
      );
    }

    if (searchTerm) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.skills &&
            job.skills.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredJobs(jobs);
  }, [selectedCategory, searchTerm, jobList]);

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            {profileInfo?.role === "CANDIDATE" ? (
              <span className="mt-12 text-lg">Explore All Jobs</span>
            ) : (
              "Jobs Dashboard"
            )}
          </h1>
          <div className="flex items-center">
            {profileInfo?.role === "CANDIDATE" ? (
              ""
            ) : (
              <PostNewJob
                jobList={jobList}
                profileInfo={profileInfo}
                user={user}
                categories={categories}
              />
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 my-4 gap-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs by title or skill..."
              className="w-full appearance-none bg-background pl-8 shadow-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            className="w-full"
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
              <div className="md:col-span-4">
                <div className="container mx-auto p-0 space-y-8">
                  <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredJobs && filteredJobs.length > 0 ? (
                      filteredJobs.map((jobItem, i) =>
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
                      <div>No jobs found</div>
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
