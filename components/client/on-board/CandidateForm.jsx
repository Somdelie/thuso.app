"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/common/SubmitButton";
import TextInput from "@/components/common/TextInput";
import { useEffect, useState } from "react";
import { TrashIcon } from "lucide-react";
import { Country, State, City } from "country-state-city";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { FaCamera } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { createProfile } from "@/actions/create-profile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const libraries = ["places"];

const schema = z.object({
  fullName: z.string().min(1, "First Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  address: z.string().min(1, "Address is required"),
  dateOfBirth: z.date({
    required_error: "Date of Birth is required",
    invalid_type_error: "Invalid date",
  }),
  avatar: z.string().optional(), // Make optional
  idUrl: z.string().optional(), // Make optional
  categoryId: z.string().optional(),
});

export function CandidateForm({ categories, subCategories }) {
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isIdLoading, setIsIdLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [idDocument, setIdDocument] = useState("");
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    categoryId: null, // Add categoryId to form data
    subcategoryId: null, // Add subcategoryId to form data
  });

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

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

  const currentAuthCurrentUser = useUser();
  const { user } = currentAuthCurrentUser;

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

  const handleAvatarFileChange = async (event, setFileState) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsAvatarLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "thusoPresset");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/cautious/image/upload",
          { method: "POST", body: formData }
        );
        const result = await response.json();
        setIsAvatarLoading(false);
        if (result.error) {
          toast({
            variant: "destructive",
            title: "Error uploading file!",
            description: result.error.message,
          });
        } else {
          toast({
            variant: "success",
            title: "File Uploaded 🎉",
            description: "Image uploaded successfully!",
          });
          setFileState(result.secure_url);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error uploading file!",
          description: error.message,
        });
      }
    }
  };
  const handleIdFileChange = async (event, setFileState) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsIdLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "thusoPresset");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/cautious/image/upload",
          { method: "POST", body: formData }
        );
        const result = await response.json();
        setIsIdLoading(false);
        if (result.error) {
          toast({
            variant: "destructive",
            title: "Error uploading file!",
            description: result.error.message,
          });
        } else {
          toast({
            variant: "success",
            title: "File Uploaded 🎉",
            description: "Image uploaded successfully!",
          });
          setFileState(result.secure_url);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error uploading file!",
          description: error.message,
        });
      }
    }
  };

  // Add a new field for categoryId
  register("categoryId", { value: "" });
  register("subcategoryId", { value: "" });
  async function onSubmit(data) {
    console.log(data, "the form data");

    // setIsLoading(true);

    // Add additional data
    data.skills = skills;
    data.country = selectedCountry;
    data.state = selectedState;
    data.address = address;
    data.city = selectedCity;
    data.gender = selectedGender;
    data.avatarUrl = avatar;
    data.idUrl = idDocument;
    data.role = "CANDIDATE";
    data.userId = user?.id;
    data.email = user?.primaryEmailAddress?.emailAddress;
    data.categoryId = formData.categoryId; // Add categoryId to form data
    data.subcategoryId = formData.subcategoryId; // Add subcategoryId to form data

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
        description: "Failed to create profile: ",
      });
    } finally {
      setIsLoading(false);
    }

    console.log("Form data submitted:", data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 w-full">
      <div>
        <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2">
          {isAvatarLoading ? (
            <div className="flex items-center">
              <span className="italic font-semibold text-green-600">
                Uploading please wait...
              </span>
              <div className="loader-image ml-auto mr-auto"></div>
            </div>
          ) : (
            <>
              <div className="gap-2 flex items-center">
                <label className=" text-gray-500 text-sm font-bold">
                  Avatar Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) =>
                      handleAvatarFileChange(e, setAvatar, "avatar")
                    }
                    className="hidden"
                    id="avatarInput"
                  />
                  <div
                    className="w-24 h-24 border-dotted border-2 border-orangeBg rounded flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      document.getElementById("avatarInput").click()
                    }
                  >
                    {avatar ? (
                      <Image
                        src={avatar}
                        width={500}
                        height={500}
                        alt="Avatar"
                        className="w-full h-full aspect-auto object-cover"
                      />
                    ) : (
                      <span className="text-sky-400 relative">
                        <FaCamera size={24} />
                      </span>
                    )}
                  </div>
                </div>
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.avatar.message}
                  </p>
                )}
              </div>
            </>
          )}

          {isIdLoading ? (
            <div className="flex items-center">
              <span className="italic font-semibold text-green-600">
                Uploading please wait...
              </span>
              <div className="loader-image ml-auto mr-auto"></div>
            </div>
          ) : (
            <div className="gap-2 flex items-center">
              <label className=" text-gray-500 text-sm font-bold">
                ID Document
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) =>
                    handleIdFileChange(e, setIdDocument, "idUrl")
                  }
                  className="hidden"
                  id="idDocumentInput"
                />
                <div
                  className="w-24 h-24 border-dotted border-2 border-orangeBg rounded flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    document.getElementById("idDocumentInput").click()
                  }
                >
                  {idDocument ? (
                    <Image
                      src={idDocument}
                      width={500}
                      height={500}
                      alt="ID Document"
                      className="w-full h-full aspect-auto object-cover"
                    />
                  ) : (
                    <span className="text-sky-400 relative">
                      <Image
                        src="/document.jpg"
                        width={500}
                        height={500}
                        alt="ID Document"
                        className="w-full h-full object-cover"
                      />
                      <FaCamera
                        className="absolute -bottom-2 -right-2"
                        size={24}
                      />
                    </span>
                  )}
                </div>
              </div>
              {errors.idUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.idUrl.message}
                </p>
              )}
            </div>
          )}

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
            type="tel"
          />

          <div className="mb-4 w-full">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              Your Date of Birth
            </label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="w-full shadow py-2 rounded px-3 text-gray-700 leading-tight"
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500">{errors.dateOfBirth.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full shadow py-2 rounded px-3 text-gray-700 leading-tight"
            >
              <option value="" disabled>
                Select Your Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
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
                  categoryId: value, // Update the formData with the selected categoryId
                });
                setValue("categoryId", value); // Set the value for react-hook-form
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
      </div>
      <div className="flex w-full items-center justify-between">
        <SubmitButton title="Create Profile" isLoading={isLoading} />
      </div>
    </form>
  );
}
