"use client";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditModal from "./EditModal";
import { deleteJobAction, editJobAction } from "@/actions/create-job";
import { updatedProfileAdmin } from "@/actions/create-profile";

const ActionCell = ({ row, type, formControls }) => {
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleSave = async (data) => {
    const rowId = row?.original.id;
    try {
      if (type === "jobs") {
        await editJobAction(rowId, data, "/admin/jobs");
        console.log(`Job with ID ${rowId} updated.`);
      } else if (type === "profile") {
        await updatedProfileAdmin(rowId, data, "/admin/profiles");
        console.log(`Profile with ID ${rowId} updated.`);
      }
      setShowActionDialog(false);
      // Optionally, you might want to call a function to refresh the UI or re-fetch data
    } catch (error) {
      console.error(`Failed to update ${type}:`, error);
    }
  };

  const handleEdit = (rowData) => {
    setSelectedRowData(rowData);
    setShowActionDialog(true);
  };

  const closeDialog = () => {
    setShowActionDialog(false);
    setSelectedRowData(null);
  };

  console.log(row?.original.id);

  const handleDelete = async () => {
    const rowId = row?.original.id;
    try {
      await deleteJobAction(rowId, "/admin/jobs");
      console.log(`Job with ID ${rowId} deleted.`);
      // Optionally, you might want to call a function to refresh the UI or re-fetch data
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleEdit(row)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedRowData && (
        <EditModal
          row={selectedRowData}
          onSave={handleSave}
          showActionDialog={showActionDialog}
          setShowActionDialog={setShowActionDialog}
          formControls={formControls}
        />
      )}
    </>
  );
};

export default ActionCell;
