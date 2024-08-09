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
  deleteCategoryAction,
  updateCategoryAction,
} from "@/actions/categoryAction"; // Add update action
import { Delete, Pencil, Trash } from "lucide-react";
import Image from "next/image"; // Import Image component
import { useToast } from "@/components/ui/use-toast"; // Import useToast
import { generateSlug } from "@/utils/generateSlug";

const Admin = ({ categories }) => {
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [isCatLoading, setIsCatLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    imageUrl: "", // Add image url to form data
    id: null, // Add id to form data to handle editing
  });

  const { toast } = useToast(); // Initialize toast

  const handleCategoryImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsCatLoading(true);
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        imageFormData.append("upload_preset", "thusoPresset");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/cautious/image/upload",
          { method: "POST", body: imageFormData }
        );
        const result = await response.json();
        setIsCatLoading(false);
        if (result.error) {
          toast({
            variant: "destructive",
            title: "Error uploading file!",
            description: result.error.message,
          });
          setIsCatLoading(false);
          setIsCatLoading(false);
        } else {
          toast({
            variant: "success",
            title: "File Uploaded 🎉",
            description: "Image uploaded successfully!",
          });
          setFormData((prevData) => ({
            ...prevData,
            imageUrl: result.secure_url,
          }));
        }
        setIsLoading(false);
        setIsCatLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error uploading file!",
          description: error.message,
        });
      }
    }
  };

  const handleSaveCategory = async () => {
    setIsLoading(true);

    const categoryData = {
      categoryName: formData.categoryName,
      slug: generateSlug(formData.categoryName), // Generate slug for category name using helper function
      imageUrl: formData.imageUrl, // Include imageUrl in the data sent
    };

    if (isEdit) {
      await updateCategoryAction(categoryData, formData.id, "/admin/category");
    } else {
      await createCategoryAction(categoryData, "/admin/category");
    }

    setIsLoading(false);
    setFormData({
      categoryName: "",
      imageUrl: "", // Reset imageUrl
      id: null,
    });
    setShowPostDialog(false);
  };

  const handleAddNewCategory = () => {
    setFormData({
      categoryName: "",
      imageUrl: "", // Add imageUrl to form data for image upload using cloudinary
      id: null,
    });
    setIsEdit(false);
    setShowPostDialog(true);
  };

  const handleEditCategory = (category) => {
    setFormData({
      categoryName: category?.categoryName,
      imageUrl: category?.imageUrl, // Add imageUrl to form data for image upload using cloudinary
      id: category?.id,
    });
    setIsEdit(true);
    setShowPostDialog(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategoryAction(id);
      toast({
        variant: "success",
        title: "Category deleted successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error deleting category!",
        description: error.message,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center w-full justify-between border-b pb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
        <Button onClick={handleAddNewCategory} className="bg-sky-700">
          Add New Category
        </Button>
      </div>
      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 py-4 md:grid-cols-4 lg:grid-cols-5 w-full gap-4">
          {categories?.map((category) => (
            <div
              key={category?.id}
              className="bg-gray-900 relative transition hover:bg-sky-600 cursor-pointer hover:scale-105 rounded text-white font-semibold h-14 justify-center flex items-center"
              onClick={() => handleEditCategory(category)} // Add onClick handler for edit
            >
              <h2 className="absolute top-auto left-auto">
                {category?.categoryName?.substring(0, 15)}
              </h2>
              <Image
                width={500}
                height={500}
                className="object-cover w-full h-full opacity-35"
                src={category?.imageUrl}
                alt={category?.categoryName}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full min-h-[55vh] items-center justify-center">
          <h3 className="font-semibold text-2xl">No categories found!</h3>
        </div>
      )}
      <Dialog
        open={showPostDialog}
        onOpenChange={() => {
          setShowPostDialog(false);
          setFormData({
            categoryName: "",
            imageUrl: "", // Reset imageUrl
            id: null,
          });
        }}
      >
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="categoryName" className="">
                Category Title
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
                className="border-2 border-gray-300 rounded-md focus:outline-none"
                placeholder="Construction"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoryImage" className="">
                Category Icon
              </Label>
              <input
                type="file"
                onChange={handleCategoryImage}
                className="border-2 border-gray-300 rounded-md focus:outline-none focus py-1 px-1"
                id="categoryImage"
              />
            </div>
            {isCatLoading && (
              <div className="col-span-4 text-center">
                <span className="italic font-semibold text-green-600">
                  Uploading please wait...
                </span>
                <div className="loader-image ml-auto mr-auto"></div>
              </div>
            )}
            {formData.imageUrl && (
              <div className="flex justify-center">
                <Image
                  src={formData.imageUrl}
                  width={200}
                  height={200}
                  alt="Category Image"
                  className="rounded"
                />
              </div>
            )}
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
            <Button
              variant="icon"
              className="text-red-600"
              onClick={handleDeleteCategory}
            >
              <Trash size={24} onClick={handleDeleteCategory} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
