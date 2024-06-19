"use client";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import EditModal from "./EditModal"; // Import the modal component
import { Label } from "../ui/label";
import { MdPermMedia } from "react-icons/md";
import { Input } from "../ui/input";
import { Dialog, DialogContent } from "../ui/dialog";

const ActionCell = ({ row, type }) => {
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleSave = (data) => {
    console.log("Saved data:", data);
    // Implement save logic here
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setShowActionDialog(true)}
            className="cursor-pointer"
          >
            <span> {type === "job" ? "View Job" : "View Candidate"}</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log("Delete logic here")}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditModal
        row={row}
        type={type}
        showActionDialog={showActionDialog}
        setShowActionDialog={setShowActionDialog}
      />
    </>
  );
};

export default ActionCell;
