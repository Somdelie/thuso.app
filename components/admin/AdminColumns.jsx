"use client";

import ActionCell from "./ActionCell";

export const jobColumns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const value = row.getValue("title");
      return value.length > 25 ? `${value.substring(0, 25)}...` : value;
    },
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => {
      const value = row.getValue("companyName");
      return value.length > 25 ? `${value.substring(0, 25)}...` : value;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const value = row.getValue("type");
      return value.length > 25 ? `${value.substring(0, 25)}...` : value;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const value = row.getValue("location");
      return value.length > 25 ? `${value.substring(0, 25)}...` : value;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const value = new Date(row.getValue("createdAt")).toLocaleDateString();
      return value.length > 25 ? `${value.substring(0, 25)}...` : value;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const value = new Date(row.getValue("updatedAt")).toLocaleDateString();
      return value.length > 25 ? `${value.substring(0, 25)}...` : value;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: (props) => <ActionCell {...props} type="job" />,
  },
];

export const candidateColumns = [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => {
      const value = row.getValue("fullName");
      return value.length > 25 ? `${value.substring(0, 25)}...` : value;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const value = row.getValue("email");
      return value.length > 25 ? `${value.substring(0, 25)}...` : value;
    },
  },
  {
    accessorKey: "isPremiumUser",
    header: "Premium User",
    cell: ({ row }) => {
      const value = row.getValue("isPremiumUser") ? "Yes" : "No";
      return value.length > 25 ? `${value.substring(0, 25)}...` : value;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: (props) => <ActionCell {...props} type="candidate" />,
  },
];
