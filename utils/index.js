// this is recruiter form controls
export const recruiterOnboardFormControls = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter Your name",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter Your company name",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter Your company role",
    componentType: "input",
  },
];

// default initial Recruiter Form Data
export const initialRecruiterFormData = {
  name: "",
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
    name: "name",
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
    label: "Previous Companies",
    name: "previousCompanies",
    placeholder: "Enter Your Previous Companies",
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
  name: "",
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
