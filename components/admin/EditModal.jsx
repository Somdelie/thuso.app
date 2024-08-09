"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchCategories } from "@/actions/categoryAction";

const EditModal = ({
  row,
  onSave,
  showActionDialog,
  setShowActionDialog,
  formControls,
}) => {
  const [formData, setFormData] = useState(row?.original);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setFormData(row?.original);
    // Fetch categories and set them to state
    fetchCategories().then((data) => setCategories(data));
  }, [row?.original]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue =
      name === "isAdmin" || name === "isApproved" ? value === "true" : value; // Convert "true" string to boolean true
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const onClose = () => {
    setShowActionDialog(false);
    setFormData(null);
  };

  console.log(formData, "form data");

  return (
    <Dialog open={showActionDialog} onOpenChange={onClose}>
      <DialogContent className="p-8 overflow-y-auto max-h-[80vh] max-w-[90%] md:max-w-[80%] mx-auto">
        <form className="grid sm:gap-2 sm:grid-cols-2">
          {formControls.map((control) => (
            <div key={control.name} className="flex flex-col mb-2 w-full">
              <Label htmlFor={control.name} className="my-2">
                {control.label}
              </Label>
              {control.type === "select" ? (
                <select
                  id={control.name}
                  name={control.name}
                  value={String(formData?.[control.name]) || ""}
                  onChange={handleChange}
                  className={`${
                    control.name === "isAdmin" || control.name === "isApproved"
                      ? "border max-w-[50%] p-2 rounded w-full"
                      : "border p-2 rounded w-full"
                  }`}
                >
                  {control.name === "isAdmin" ||
                  control.name === "isApproved" ? (
                    <>
                      <option
                        value="true"
                        disabled={
                          control.name === "isAdmin" &&
                          formData?.isAdmin === true
                        }
                      >
                        Yes
                      </option>
                      <option
                        value="false"
                        disabled={
                          control.name === "isAdmin" &&
                          formData?.isAdmin === false
                        }
                      >
                        No
                      </option>
                    </>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))
                  )}
                </select>
              ) : (
                <Input
                  id={control.name}
                  name={control.name}
                  value={formData?.[control.name] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </form>
        <DialogFooter>
          <div className="w-1/2 gap-2 grid grid-cols-2">
            <Button onClick={onClose} className="bg-red-500">
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
