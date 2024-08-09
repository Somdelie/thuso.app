/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "lucide-react";
import SubmitButton from "@/components/common/SubmitButton";
import { Country, State } from "country-state-city";
import { useToast } from "@/components/ui/use-toast";
import { updateProfile } from "@/actions/create-profile";
import Image from "next/image";

// Example mappings (these should be comprehensive)
const countryMap = Object.fromEntries(
  Country.getAllCountries().map((country) => [country.isoCode, country.name])
);

const CandidateAccount = ({ profileInfo }) => {
  const [skills, setSkills] = useState(profileInfo.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    profileInfo.country || ""
  );
  const [selectedState, setSelectedState] = useState(profileInfo.state || "");
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: profileInfo.fullName || "",
      address: profileInfo.address || "",
      phoneNumber: profileInfo.phoneNumber || "",
      preferredJobLocation: profileInfo.preferredJobLocation || "",
      linkedinProfile: profileInfo.linkedinProfile || "",
      skills: "", // Initializing as empty since skills are managed separately
    },
  });

  useEffect(() => {
    // Populate country options
    setCountryOptions(Country.getAllCountries());

    // Update states when country changes
    if (selectedCountry) {
      setStateOptions(State.getStatesOfCountry(selectedCountry));
    }
  }, [selectedCountry]);

  // Get full names for country and state
  const countryName = countryMap[selectedCountry] || "Unknown Country";
  const stateName = selectedCountry
    ? stateOptions.find((state) => state.isoCode === selectedState)?.name ||
      "Unknown State"
    : "Unknown State";

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      await updateProfile(profileInfo.id, { ...data, skills }, "/account");
      toast({
        variant: "success",
        title: "Profile Created 🎉",
        description: "Your profile has been updated successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating profile!",
        description: "Failed to create profile: ",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const removeSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (skillInput) {
      setSkills((prevSkills) => [...prevSkills, skillInput]);
      setSkillInput("");
    }
  };

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Your Account Info</CardTitle>
        <CardDescription>
          You can update your account information here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="md:px-8 pt-6 w-full">
          <div className="grid sm:grid-cols-2 w-full gap-4 mb-4">
            <div className="flex items-center gap-6">
              <Image
                src={profileInfo?.avatarUrl}
                width={100}
                height={100}
                alt="avatar"
                className="rounded aspect-auto"
              />
              <div>
                <h1 className="font-semibold">{profileInfo?.fullName}</h1>
                <span className="text-orange-500">
                  Please contact our support to update this
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Image
                src={profileInfo?.idUrl}
                width={100}
                height={100}
                alt="avatar"
              />
              <div className="">
                <p className="text-gray-400">Your Uploaded ID/PASSPORT</p>
                <span className="text-orange-500">
                  Please contact our support to update this
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 w-full">
            {/* converted date goes here under this line. */}
            <div className=" w-full bg-heroBg py-2 px-4 shadow text-muted-foreground">
              {profileInfo?.dateOfBirth
                ? new Date(profileInfo?.dateOfBirth).toLocaleDateString()
                : "No Date of Birth Provided"}
            </div>
            <div className=" w-full bg-heroBg py-2 px-4 shadow text-muted-foreground">
              {profileInfo?.gender ? (
                <span>{profileInfo?.gender}</span>
              ) : (
                "No Gender Provided"
              )}
            </div>
            <div className=" w-full bg-heroBg py-2 px-4 shadow text-muted-foreground">
              {countryName}
            </div>
            <div className=" w-full bg-heroBg py-2 px-4 shadow text-muted-foreground">
              {stateName}
            </div>
            <div className=" w-full bg-heroBg py-2 px-4 shadow text-muted-foreground">
              {profileInfo?.city}
            </div>
            <div className=" w-full bg-heroBg py-2 px-4 shadow text-muted-foreground">
              {profileInfo?.email}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:px-8 pt-6 pb-8 w-full"
        >
          <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2">
            <Input
              name="fullName"
              placeholder="Full Name"
              {...register("fullName")}
            />

            <Input
              name="address"
              placeholder="Address"
              {...register("address")}
            />

            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              {...register("phoneNumber")}
            />
            {/* 
            <Input
              name="companyName"
              placeholder="Company Name"
              {...register("companyName")}
            /> */}

            <Input
              name="preferredJobLocation"
              placeholder="Preferred Job Location"
              {...register("preferredJobLocation")}
            />

            <Input
              name="linkedinProfile"
              placeholder="LinkedIn Profile"
              {...register("linkedinProfile")}
            />

            <div className="flex items-center">
              <Input
                type="text"
                value={skillInput}
                placeholder="Add New Skill"
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addSkill}
                className="py-[8px] whitespace-nowrap bg-black rounded-r text-white px-3 hover:opacity-85"
              >
                Add Skill
              </button>
            </div>
          </div>
          <div className=" col-span-2">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              Your Skills
            </label>
            <div className=" bg-green-600 rounded w-full flex flex-wrap p-4 gap-4 items-center">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-700 rounded px-3 text-white"
                >
                  <p className="capitalize">{skill}</p>
                  <Button
                    type="button"
                    variant="icon"
                    onClick={() => removeSkill(index)}
                    className="text-red-500 ml-auto hover:text-red-700"
                  >
                    <TrashIcon size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full items-center justify-between mt-4">
            <SubmitButton title="Save Changes" isLoading={isLoading} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CandidateAccount;
