"use client";
import { z } from "zod";
import TextInput from "@/components/common/TextInput";
import { useUser } from "@clerk/nextjs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/common/SubmitButton";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createProfile } from "@/actions/create-profile";

const schema = z.object({
  fullName: z.string().min(1, "First Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  address: z.string().min(1, "Address is required"),
});

const RecruiterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentAuthCurrentUser = useUser();
  const { user } = currentAuthCurrentUser;

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data, "the form data");

    // setIsLoading(true);

    // Add additional data
    data.role = "RECRUITER";
    data.userId = user?.id;
    data.email = user?.primaryEmailAddress?.emailAddress;
    try {
      // Call createProfile with form data and the path to revalidate
      await createProfile(data, "/onboard"); // Adjust the path if necessary
      toast({
        variant: "success",
        title: "Profile Created 🎉",
        description: "Your profile has been created successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating profile!",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }

    console.log("Form data submitted:", data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <TextInput
          label="Full Name"
          register={register}
          name="fullName"
          errors={errors}
        />
        <TextInput
          label="Email Address"
          register={register}
          name="email"
          errors={errors}
          type="email"
        />
        <TextInput
          label="Phone Number"
          register={register}
          name="phoneNumber"
          errors={errors}
          type="tel"
        />
        <TextInput
          label="Your Address"
          register={register}
          name="address"
          errors={errors}
        />
        <TextInput
          label="Your Company Name (optional)"
          register={register}
          name="companyName"
          errors={errors}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <SubmitButton title="Create Profile" isLoading={isLoading} />
      </div>
    </form>
  );
};

export default RecruiterForm;
