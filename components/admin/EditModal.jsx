/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditModal = ({ row, onSave, showActionDialog, setShowActionDialog }) => {
  const [formData, setFormData] = useState(row?.original);

  useEffect(() => {
    setFormData(row?.original);
  }, [row?.original]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };
  console.log(formData, "form data");
  return (
    <Dialog
      open={showActionDialog}
      onOpenChange={() => {
        setShowActionDialog(false);
      }}
    >
      <DialogContent className="p-8 max-w-[90%] md:max-w-[80%] mx-auto">
        <Input value={formData?.email} />
        <DialogFooter>
          {" "}
          <Button
            onClick={() => setShowActionDialog(false)}
            className="bg-red-500"
          >
            Cancel
          </Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
