"use client";
import { createProfile } from "@/actions/create-profile";
import Form from "@/components/common/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseClient = createClient(
  "https://lyfonawvuwlvyluvlokf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Zm9uYXd2dXdsdnlsdXZsb2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3MDM0ODksImV4cCI6MjAzMzI3OTQ4OX0.NjIi1BkIEluw_y2YezB7Nf1F2jQo6mlbWCZ57-tcLcA"
);

const Onboard = () => {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [file, setFile] = useState(null);
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );

  const currentAuthCurrentUser = useUser();
  const { user } = currentAuthCurrentUser;

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  const handleUploadPdfToSupabase = async () => {
    const { data, error } = await supabaseClient.storage
      .from("thuso-com")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data, error);
    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
    }
  };

  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  });

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  // console.log(candidateFormData);

  const handleRecruiterFormValid = () => {
    return (
      recruiterFormData &&
      recruiterFormData.recruiterName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== "" &&
      recruiterFormData.companyName.trim() !== ""
    );
  };

  function handleCandidateFormValid() {
    return Object.keys(candidateFormData).every(
      (key) => candidateFormData[key].trim() === ""
    );
  }

  const createProfileAction = async () => {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "CANDIDATE",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "RECRUITER",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };
    await createProfile(data, "/onboard");
  };

  return (
    <div className="bg-white">
      <Tabs
        defaultValue="candidate"
        value={currentTab}
        onValueChange={handleTabChange}
      >
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-12">
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
          <Form
            action={createProfileAction}
            formControls={candidateOnboardFormControls}
            buttonText={"Onboard as candidate"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            handleFileChange={handleFileChange}
            isButtonDisabled={handleCandidateFormValid()}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <Form
            formControls={recruiterOnboardFormControls}
            buttonText={"Onboard as recruiter"}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isButtonDisabled={!handleRecruiterFormValid()}
            action={createProfileAction}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Onboard;
