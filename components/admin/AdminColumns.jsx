"use client";
import { Avatar } from "@mui/material";
import ActionCell from "./ActionCell";
import moment from "moment";

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
    cell: ({ row }) => moment(row.original.createdAt).format("YYYY-MM-DD"),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => moment(row.original.updatedAt).format("YYYY-MM-DD"),
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
  { name: "phoneNumber", label: "Phone Number" },
  { name: "address", label: "Address" },
  { name: "isAdmin", label: "Is Admin", type: "select" },
  { name: "isApproved", label: "isApproved", type: "select" },
];

export const candidateColumns = [
  {
    accessorKey: "avatarUrl",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar
        src={row.getValue("avatarUrl")}
        alt={
          row
            .getValue("fullName")
            ?.split(" ")
            .map((n) => n[0])
            .join("") || "JD"
        }
        sx={{ borderWidth: 2, borderColor: "red" }}
      />
    ),
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => row.getValue("gender"),
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => moment(row.original.createdAt).format("YYYY-MM-DD"),
  },
  {
    accessorKey: "isApproved",
    header: "Is Approved",
    cell: ({ row }) => (row.getValue("isApproved") ? "Yes" : "No"),
  },
  {
    accessorKey: "memberShipType",
    header: "Membership Type",
    cell: ({ row }) =>
      row.getValue("memberShipType") ? row.getValue("memberShipType") : "Basic",
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
