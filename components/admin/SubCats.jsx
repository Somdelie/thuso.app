"use client";
import { z } from "zod";
import {
  createSubcategoryAction,
  updateSubcategoryAction,
} from "@/actions/categoryAction";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import SubmitButton from "../common/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../common/TextInput";
import { useForm } from "react-hook-form";
import { generateSlug } from "@/utils/generateSlug";

const schema = z.object({
  subCategoryName: z.string().min(1, "Subcategory name is required"),
  desc: z.string().min(1, "Description is required"),
  categoryId: z.string().min(1, "Category is required"),
});

const SubCats = ({ subCategories, categories }) => {
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    subCategoryName: "",
    desc: "",
    id: null, // Add id to form data to handle editing
    categoryId: null, // Add categoryId to form data
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleAddNewSubCategory = () => {
    setFormData({
      subCategoryName: "",
      id: null,
      categoryId: null,
    });
    setIsEdit(false);
    setShowPostDialog(true);
  };

  async function onSubmit(data) {
    data.categoryId = formData.categoryId;
    data.slug = generateSlug(data.subCategoryName);
    console.log(data, "the form data");
    setIsLoading(true);
    try {
      await createSubcategoryAction(data, "/sub-categories");
      reset(); // Reset the form after successful creation
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setShowPostDialog(false);
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center w-full justify-between border-b pb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Categories</h1>
        <Button onClick={handleAddNewSubCategory} className="bg-sky-700">
          Add New Category
        </Button>
      </div>
      {subCategories && subCategories?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 py-4 md:grid-cols-4 lg:grid-cols-5 w-full gap-4">
          {subCategories?.map((category) => (
            <div
              key={category?.id}
              className="bg-gray-900 relative transition hover:bg-sky-600 cursor-pointer hover:scale-105 rounded text-white font-semibold h-14 justify-center flex items-center"
            >
              <h2 className="absolute top-auto left-auto">
                {category?.subcategoryName?.substring(0, 15)}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full min-h-[55vh] items-center justify-center">
          <h3 className="font-semibold text-2xl">No sub categories found!</h3>
        </div>
      )}
      <Dialog
        open={showPostDialog}
        onOpenChange={() => {
          setShowPostDialog(false);
          setFormData({
            subCategoryName: "",
            id: null,
            categoryId: null,
          });
        }}
      >
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Sub Category" : "Add New Sub Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-8 pt-6 pb-8 w-full"
            >
              <div>
                <TextInput
                  label="Sub Category Title"
                  register={register}
                  name="subCategoryName"
                  errors={errors}
                />
                <TextInput
                  label="Description"
                  register={register}
                  name="desc"
                  errors={errors}
                />
                <div className="mb-4">
                  <label className="block text-gray-500 text-sm font-bold mb-2">
                    Category
                  </label>

                  <Select
                    onValueChange={(value) => {
                      setFormData({
                        ...formData,
                        categoryId: value, // Update the formData with the selected categoryId
                      });
                      setValue("categoryId", value); // Set the value for react-hook-form
                    }}
                  >
                    <SelectTrigger>Select Category</SelectTrigger>
                    <SelectContent>
                      {categories &&
                        categories.map((cat) => (
                          <SelectItem key={cat?.id} value={cat?.id}>
                            {cat?.categoryName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  {errors.categoryId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex w-full items-center justify-between">
                <SubmitButton
                  title="Create Sub Category"
                  isLoading={isLoading}
                />
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubCats;
