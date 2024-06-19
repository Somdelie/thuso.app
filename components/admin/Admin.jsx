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
import {
  createCategoryAction,
  updateCategoryAction,
} from "@/actions/categoryAction"; // Add update action
import { Pencil } from "lucide-react";

const Admin = ({ categories }) => {
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    id: null, // Add id to form data to handle editing
  });

  const handleSaveCategory = async () => {
    setIsLoading(true);

    if (isEdit) {
      await updateCategoryAction(
        {
          categoryName: formData?.categoryName,
        },
        formData?.id,
        "/admin/category"
      );
    } else {
      await createCategoryAction(
        {
          categoryName: formData?.categoryName,
        },
        "/admin/category"
      );
    }

    setIsLoading(false);
    setFormData({
      categoryName: "",
      id: null,
    });
    setShowPostDialog(false);
  };

  const handleAddNewCategory = () => {
    setFormData({
      categoryName: "",
      id: null,
    });
    setIsEdit(false);
    setShowPostDialog(true);
  };

  const handleEditCategory = (category) => {
    setFormData({
      categoryName: category?.categoryName,
      id: category?.id,
    });
    setIsEdit(true);
    setShowPostDialog(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
        <Button onClick={handleAddNewCategory} className="bg-sky-700">
          Add New Category
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 py-4 md:grid-cols-4 lg:grid-cols-5 w-full gap-4">
        {categories && categories.length > 0 ? (
          categories?.map((category) => (
            <div
              key={category?.id}
              className="bg-gray-900 transition p-2 hover:bg-sky-600 cursor-pointer hover:scale-105 rounded text-white font-semibold h-16 items-center justify-between flex flex-col relative group"
              onClick={() => handleEditCategory(category)} // Add onClick handler for edit
            >
              <h2 className="pr-2">
                {" "}
                {category?.categoryName?.substring(0, 15)}
              </h2>
              <Pencil
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                size={18}
              />
            </div>
          ))
        ) : (
          <div className="flex w-full min-h-[55vh] items-center justify-center">
            <h3 className="font-semibold text-2xl">No categories found!</h3>
          </div>
        )}
      </div>
      <Dialog
        open={showPostDialog}
        onOpenChange={() => {
          setShowPostDialog(false);
          setFormData({
            categoryName: "",
            id: null,
          });
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Name
              </Label>
              <Input
                name="categoryName"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    categoryName: event.target.value,
                  })
                }
                value={formData?.categoryName}
                className="col-span-3"
                placeholder="Construction"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveCategory}
              disabled={formData?.categoryName.trim() === ""}
            >
              {isLoading
                ? "Please wait..."
                : isEdit
                ? "Update Category"
                : "Save Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
