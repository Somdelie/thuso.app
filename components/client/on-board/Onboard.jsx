/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialCandidateFormData, initialRecruiterFormData } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { CandidateForm } from "./CandidateForm";
import RecruiterForm from "./RecruiterForm";

const Onboard = ({ categories, subCategories }) => {
  const [currentTab, setCurrentTab] = useState("candidate");
  const currentAuthCurrentUser = useUser();
  const { user } = currentAuthCurrentUser;

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  return (
    <div className="max-w-[90%] mx-auto">
      <Tabs
        defaultValue="candidate"
        value={currentTab}
        onValueChange={handleTabChange}
      >
        <div className="w-full pt-8">
          <p>Hi {user?.firstName}</p>
          <div className="flex items-baseline justify-between border-b pb-4">
            <h1 className="text-lg md:text-4xl font-bold tracking-tight text-gray-900">
              Welcome to <span className="text-amber-800">onboarding</span>
            </h1>

            <TabsList className="bg-gray-500 text-white">
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <p className="text-gray-600 mt-4">
            <strong>Candidate:</strong> As a candidate, you can create a
            profile, upload your profile picture, valid ID document, and apply
            for jobs that match your skills and interests. You'll have access to
            a wide range of job listings and can manage your job applications
            directly from your dashboard.
          </p>
          {/* Candidate form goes here */}
          <CandidateForm
            categories={categories}
            subCategories={subCategories}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <p className="text-gray-600 mt-4">
            <strong>Recruiter:</strong> As a recruiter, you can post job
            openings, search for candidates, and manage your recruitment
            process. You'll have access to a pool of talented candidates and can
            reach out to potential hires directly through the platform.
          </p>
          {/* Recruiter form goes here */}
          <RecruiterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Onboard;
