"use client";
import ActionCell from "./ActionCell";

const jobFormControls = [
  { name: "title", label: "Title" },
  { name: "type", label: "Type" },
  { name: "location", label: "Location" },
  { name: "experience", label: "Experience" },
  { name: "skills", label: "Skills" },
  { name: "categoryId", label: "Category", type: "select", options: [] }, // Add the categoryId field
];

export const jobColumns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "Category.categoryName", // Update to access nested category name
    header: "Category",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "experience",
    header: "Experience",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionCell row={row} type="jobs" formControls={jobFormControls} />
    ),
  },
];
const candidateFormControls = [
  { name: "fullName", label: "Full Name" },
  { name: "email", label: "Email" },
  { name: "isPremiumUser", label: "Is PremiumUser" },
];

export const candidateColumns = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isAdmin",
    header: "Is Admin",
  },
  {
    accessorKey: "role",
    header: "Profile Type",
  },
  {
    accessorKey: "isPremiumUser",
    header: "Is PremiumUser",
  },
  {
    accessorKey: "memberShipType",
    header: "Membership Type",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionCell
        row={row}
        type="profile"
        formControls={candidateFormControls}
      />
    ),
  },
];
