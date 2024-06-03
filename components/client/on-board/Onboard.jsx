"use client";
import { createProfile } from "@/actions";
import Form from "@/components/common/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const Onboard = () => {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );

  const currentAuthCurrentUser = useUser();
  const { user } = currentAuthCurrentUser;

  function handleTabChange(value) {
    setCurrentTab(value);
  }

  //   console.log(recruiterFormData);

  const handleRecruiterFormValid = () => {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  };

  const createProfileAction = async () => {
    const data = {
      recruiterInfo: recruiterFormData,
      role: "recruiter",
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
            formControls={candidateOnboardFormControls}
            buttonText={"Onboard as recruiter"}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
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
