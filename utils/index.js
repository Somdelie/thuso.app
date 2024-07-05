import {
  Category,
  Chat,
  LineStyle,
  Newspaper,
  People,
  SettingsApplicationsRounded,
  Work,
} from "@mui/icons-material";

// this is recruiter form controls
export const recruiterOnboardFormControls = [
  {
    label: "Name",
    name: "fullName",
    placeholder: "Enter Your fullName",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter Your Company Name",
    componentType: "input",
  },
];

// default initial Recruiter Form Data
export const initialRecruiterFormData = {
  fullName: "",
  companyName: "",
};

// this is recruiter form controls
export const candidateOnboardFormControls = [
  {
    label: "Name",
    name: "fullName",
    placeholder: "Enter Your fullName",
    componentType: "input",
  },
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },

  {
    label: "Preferred Job Location",
    name: "preferredJobLocation",
    placeholder: "Enter Your Preferred Job Location",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "List your services e.g Painter, Plumbing etc",
    componentType: "input",
  },
];

// default initial candidate Recruiter Form Data
export const initialCandidateFormData = {
  fullName: "",
  resume: "",
  companyName: "",
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
    label: "Category",
    name: "Category",
    placeholder: "Select a category",
    componentType: "select",
    options: [], // This will be populated dynamically
  },
  {
    label: "Company Name",
    name: "companyName", // ensure this matches the jobFormData key
    placeholder: "Company Name",
    componentType: "input",
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
    placeholder: "Skills Needed e.g Painting, Plumbing",
    componentType: "input",
  },
];

// default post new job form data
export const initialPostNewJobFormData = {
  companyName: "",
  title: "",
  Category: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};

export const createCategoryFormControls = [
  {
    label: "Category Name",
    name: "categoryName", // ensure this matches the jobFormData key
    placeholder: "Construction",
    componentType: "input",
  },
];

export const initialCreateCategoryFormData = {
  categoryName: "",
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

export const AdminLinks = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <LineStyle />,
  },
  {
    title: "Candidates",
    link: "/admin/candidates",
    icon: <People />,
  },
  {
    title: "Categories",
    link: "/admin/categories",
    icon: <Category />,
  },
  {
    title: "Jobs",
    link: "/admin/jobs",
    icon: <Work />,
  },
  {
    title: "Messages",
    link: "/admin/messages",
    icon: <Chat />,
  },
  {
    title: "Feeds",
    link: "/admin/feeds",
    icon: <Newspaper />,
  },
  {
    title: "Applications",
    link: "/admin/applications",
    icon: <SettingsApplicationsRounded />,
  },
];

export const jobColumns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => row.getValue("title"),
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => row.getValue("companyName"),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => row.getValue("type"),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.getValue("location"),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleDateString(),
  },
];

export const candidateColumns = [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => row.getValue("fullName"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => row.getValue("role"),
  },
  {
    accessorKey: "isPremiumUser",
    header: "Premium User",
    cell: ({ row }) => (row.getValue("isPremiumUser") ? "Yes" : "No"),
  },
];
