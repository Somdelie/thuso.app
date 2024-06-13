// this is recruiter form controls
export const recruiterOnboardFormControls = [
  {
    label: "Name",
    name: "recruiterName",
    placeholder: "Enter Your name",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter Your Company Name",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter Your Company Role",
    componentType: "input",
  },
];

// default initial Recruiter Form Data
export const initialRecruiterFormData = {
  recruiterName: "",
  companyName: "",
  companyRole: "",
};

// this is recruiter form controls
export const candidateOnboardFormControls = [
  {
    label: "Document Photo",
    name: "documentPhoto",
    // placeholder: "Enter Your Document Photo (ID / PASSPORT / DRIVER's LICENSE)",
    componentType: "file",
  },
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },
  {
    label: "Name",
    name: "candidateName",
    placeholder: "Enter Your name",
    componentType: "input",
  },
  {
    label: "Current Company",
    name: "currentCompany",
    placeholder: "Enter Your current company",
    componentType: "input",
  },
  {
    label: "Current Job Location",
    name: "currentJobLocation",
    placeholder: "Enter Your Current Job Location",
    componentType: "input",
  },
  {
    label: "Preferred Job Location",
    name: "preferredJobLocation",
    placeholder: "Enter Your Preferred Job Location",
    componentType: "input",
  },
  {
    label: "Current Salary",
    name: "currentSalary",
    placeholder: "Enter Your Current Salary",
    componentType: "input",
  },
  {
    label: "Notice Period",
    name: "noticePeriod",
    placeholder: "Enter Your Notice Period",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter Your Skills",
    componentType: "input",
  },
  {
    label: "Total Experience",
    name: "totalExperience",
    placeholder: "Enter Your Total Experience",
    componentType: "input",
  },
  {
    label: "College Location",
    name: "collegeLocation",
    placeholder: "Enter Your College Location",
    componentType: "input",
  },
  {
    label: "Graduated Year",
    name: "graduatedYear",
    placeholder: "Enter Your Graduated Year",
    componentType: "input",
  },
  {
    label: "Linkedin Profile",
    name: "linkedinProfile",
    placeholder: "Enter Your Linkedin Profile",
    componentType: "input",
  },
];

// default initial candidate Recruiter Form Data
export const initialCandidateFormData = {
  documentPhoto: "",
  resume: "",
  currentCompany: "",
  currentJobLocation: "",
  preferredJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  totalExperience: "",
  collegeLocation: "",
  graduatedYear: "",
  linkedinProfile: "",
};

// Example options for select input
const jobTypeOptions = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
];

// this is new job post form controls
export const postNewJobFormControls = [
  {
    label: "Company Name",
    name: "companyName", // ensure this matches the jobFormData key
    placeholder: "Company Name",
    componentType: "input",
    disabled: true,
  },
  {
    label: "Title",
    name: "title",
    placeholder: "Job Title",
    componentType: "input",
  },
  {
    label: "Type",
    name: "type",
    placeholder: "Job Type",
    componentType: "select",
    options: jobTypeOptions, // Adding options for select component
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Job Location",
    componentType: "input",
  },
  {
    label: "Experience",
    name: "experience",
    placeholder: "Experience",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Job Description",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Skills Needed",
    componentType: "input",
  },
];

// default post new job form data
export const initialPostNewJobFormData = {
  companyName: "",
  title: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};

export const filterMenuDataArray = [
  {
    id: "CompanyName",
    label: "Company Name",
  },
  {
    id: "Title",
    label: "Title",
  },
  {
    id: "type",
    label: "Job Type",
  },
  {
    id: "location",
    label: "Location",
  },
];

export const membershipPlans = [
  {
    heading: "Basic",
    price: 100,
    desc: "This plan is for those who have a team already and running a large business.",
    type: "Basic",
    benefits: [
      {
        before: 20,
        list: "team members",
      },
      {
        list: "Plan",
        after: "team meetings",
      },
      {
        list: "File sharing",
      },
    ],
  },
  {
    heading: "Gold",
    price: 200,
    desc: "This plan is for those who have a team already and running a large business.",
    type: "Gold",
    benefits: [
      {
        before: 20,
        list: "team members",
      },
      {
        list: "Plan",
        after: "team meetings",
      },
      {
        list: "File sharing",
      },
    ],
  },
  {
    heading: "Premium",
    price: 300,
    desc: "This plan is for those who have a team already and running a large business.",
    type: "Premium",
    benefits: [
      {
        before: 20,
        list: "team members",
      },
      {
        list: "Plan",
        after: "team meetings",
      },
      {
        list: "File sharing",
      },
      {
        list: "Access to ",
        after: "GreenHub",
      },
      {
        list: "Call Support ",
      },
      {
        before: "Priority",
        list: "Support",
      },
      {
        before: "One on One",
        list: "Meeting",
      },
    ],
  },
];
