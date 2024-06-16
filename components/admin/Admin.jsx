"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Admin = () => {
  const [showPostDialog, setShowPostDialog] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
        <Button onClick={() => setShowPostDialog(true)}>Add New Post</Button>
      </div>
      <Dialog
        open={showPostDialog}
        onOpenChange={() => {
          setShowPostDialog(false);
          //   setFormData({
          //     name: "",
          //   });
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Name
              </Label>
              <Input
                id="category"
                className="col-span-3"
                placeholder="Construction"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
