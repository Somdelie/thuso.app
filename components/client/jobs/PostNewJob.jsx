"use client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { postNewJobAction } from "@/actions/create-job";
import { useToast } from "@/components/ui/use-toast";
import Form from "@/components/common/Form";
import TextInput from "@/components/common/TextInput";
import { Button } from "@/components/ui/button";
import { Country, State, City } from "country-state-city";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import SubmitButton from "@/components/common/SubmitButton";
import { TrashIcon } from "lucide-react";

const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  location: z.string().min(1, "Job location is required"),
  type: z.string().min(1, "Job type is required"),
  categoryId: z.string().min(1, "Category is required"),
  subcategoryId: z.string().min(1, "Subcategory is required"),
  description: z.string().min(1, "Job description is required"),
});

const PostNewJob = ({
  profileInfo,
  user,
  jobList,
  categories,
  subCategories,
}) => {
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: null,
    subcategoryId: null,
  });

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });

  useEffect(() => {
    const savedSkills = localStorage.getItem("skills");
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry));
      setSelectedState("");
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState(selectedCountry, selectedState));
      setSelectedCity("");
    }
  }, [selectedCountry, selectedState]);

  useEffect(() => {
    if (formData.categoryId) {
      setFilteredSubCategories(
        subCategories.filter(
          (subCat) => subCat.categoryId === formData.categoryId
        )
      );
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.categoryId, subCategories]);

  const addSkill = () => {
    if (skillInput) {
      setSkills((prevSkills) => [...prevSkills, skillInput]);
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  async function onSubmit(data) {
    console.log(data, "the form data");
    setIsLoading(true);

    // Ensure all necessary fields are populated
    if (
      !selectedCountry ||
      !selectedState ||
      !selectedCity ||
      !formData.categoryId ||
      !formData.subcategoryId
    ) {
      toast({
        variant: "destructive",
        title: "Error posting job!",
        description: "All fields are required.",
      });
      setIsLoading(false);
      return;
    }

    data.skills = skills;
    data.profileId = profileInfo?.id;
    data.country = selectedCountry;
    data.state = selectedState;
    data.city = selectedCity;
    data.recruiterId = profileInfo?.id;
    data.email = profileInfo?.email;
    data.categoryId = formData.categoryId;
    data.subcategoryId = formData.subcategoryId;

    try {
      await postNewJobAction(data, "/jobs"); // Call your job posting action
      toast({
        variant: "success",
        title: "Job Posted 🎉",
        description: "Your job has been posted successfully!",
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error posting job!",
        description: "Failed to post job: " + error.message,
      });
    } finally {
      setIsLoading(false);
      setShowJobDialog(false); // Close the dialog after submission
    }

    console.log("Form data submitted:", data);
  }

  function handleAddNewJob() {
    if (!profileInfo?.isPremiumUser && jobList.length >= 2) {
      toast({
        variant: "destructive",
        title: "Please Get Membership",
        description:
          "You can post the max of 2 jobs unless you opt for membership",
      });
      return;
    }
    setShowJobDialog(true);
  }

  return (
    <div className="w-full">
      <Button
        onClick={handleAddNewJob}
        className="disabled:opacity-60 mt-6 flex h-11 items-center justify-center px-5"
      >
        Post A Job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
        }}
      >
        <DialogContent className="sm:max-w-screen-md md:max-w-screen-lg h-[500px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 pt-6 pb-8 w-full"
          >
            <div className="grid md:grid-cols-2 gap-x-4">
              <TextInput
                label="Job Title"
                register={register}
                name="title"
                errors={errors}
              />
              <div className="mb-4">
                <label className="block text-gray-500 text-sm font-bold mb-2">
                  Job Type
                </label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full shadow py-2 rounded px-3 text-gray-700 leading-tight"
                    >
                      <option value="" disabled>
                        Select Job Type
                      </option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                      <option value="temporary">Temporary</option>
                      <option value="contract">Contract</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="other">Other</option>
                    </select>
                  )}
                />
                {errors.jobType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.jobType.message}
                  </p>
                )}
              </div>
              <TextInput
                label="Job Location"
                register={register}
                name="location"
                errors={errors}
              />

              <div className="mb-4">
                <label className="block text-gray-500 text-sm font-bold mb-2">
                  Country of Origin
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full shadow py-2 rounded px-3 text-gray-700 leading-tight"
                >
                  <option value="">Select Country</option>
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 text-sm font-bold mb-2">
                  State of Origin
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full shadow py-2 rounded px-3 text-gray-700 leading-tight"
                  disabled={!states.length}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 text-sm font-bold mb-2">
                  City of Origin
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full shadow py-2 rounded px-3 text-gray-700 leading-tight"
                  disabled={!cities.length}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 text-sm font-bold mb-2">
                  Service Category
                </label>
                <Select
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      categoryId: value,
                    });
                    setValue("categoryId", value);
                  }}
                >
                  <SelectTrigger>Select Category</SelectTrigger>
                  <SelectContent>
                    {categories &&
                      categories.map((cat) => (
                        <SelectItem key={cat?.id} value={cat?.id}>
                          {cat?.categoryName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-gray-500 text-sm font-bold mb-2">
                  Sub Category
                </label>
                <Controller
                  name="subcategoryId"
                  control={control}
                  render={({ field }) => (
                    <div className="mb-2">
                      <Select
                        defaultValue="Sub Category"
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setFormData((prevData) => ({
                            ...prevData,
                            subcategoryId: value,
                          }));
                        }}
                      >
                        <SelectTrigger className="w-full">
                          Add Subcategory
                        </SelectTrigger>
                        <SelectContent>
                          {filteredSubCategories.map((subCat) => (
                            <SelectItem
                              key={subCat.id}
                              value={subCat.id}
                              className="cursor-pointer"
                            >
                              {subCat?.subcategoryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subcategoryId && (
                        <p className="text-red-500">
                          {errors.subcategoryId.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <TextInput
                label="Job Description"
                register={register}
                name="description"
                errors={errors}
              />
              <div className="mb-4">
                <label className="block text-gray-500 text-sm font-bold mb-2">
                  Your Skills
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="w-full shadow py-2 rounded-l px-3 text-gray-700 leading-tight "
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="py-[6px] whitespace-nowrap bg-black rounded-r text-white px-3 hover:opacity-85"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 w-full flex flex-wrap gap-4 items-center">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-700 rounded px-3 text-white mb-2"
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

            <div className="flex w-full items-center justify-between">
              <SubmitButton title="Create Profile" isLoading={isLoading} />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewJob;
