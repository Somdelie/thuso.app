"use client";
import { postNewJobAction } from "@/actions/create-job";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  initialPostNewJobFormData,
  postNewJobFormControls as basePostNewJobFormControls,
} from "@/utils";
import { Save } from "lucide-react";
import { useState } from "react";

const AdminPostJob = ({ user, categories, profileInfo }) => {
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
  });

  // Create the form controls with the categories fetched from the database
  const postNewJobFormControls = basePostNewJobFormControls.map((control) => {
    if (control.name === "Category") {
      return {
        ...control,
        options: categories.map((category) => ({
          value: category.id,
          label: category.categoryName,
        })),
      };
    }
    return control;
  });

  const isEmptyValues = () => {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control]?.trim() !== ""
    );
  };

  const createNewJob = async () => {
    setIsLoading(true);
    await postNewJobAction(
      {
        ...jobFormData,
        Category: jobFormData.Category, // Directly use the Category ID string
        recruiterId: user?.id,
        profileId: profileInfo?.id,
      },
      "/admin/jobs"
    );
    setIsLoading(false);
    setJobFormData({
      ...initialPostNewJobFormData,
    });
    setShowJobDialog(false);
  };

  return (
    <div>
      <Button onClick={() => setShowJobDialog(true)}>Add New Job</Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setJobFormData({
            ...initialPostNewJobFormData,
          });
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[500px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
          </DialogHeader>
          <div className="grid my-8 w-full gap-4 py-4">
            <Form
              buttonText={
                <>
                  {isLoading ? (
                    "Please wait..."
                  ) : (
                    <>
                      {" "}
                      <Save className="mr-4" />
                      Save
                    </>
                  )}
                </>
              }
              formData={jobFormData}
              setFormData={setJobFormData}
              formControls={postNewJobFormControls}
              isButtonDisabled={!isEmptyValues()}
              action={createNewJob}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPostJob;
