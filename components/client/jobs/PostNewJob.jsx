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
import { useToast } from "@/components/ui/use-toast";
import {
  initialPostNewJobFormData,
  postNewJobFormControls as basePostNewJobFormControls,
} from "@/utils";
import { Save } from "lucide-react";
import { useState } from "react";

const PostNewJob = ({ profileInfo, user, jobList, categories }) => {
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
  });

  const { toast } = useToast();

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
      },
      "/jobs"
    );
    setIsLoading(false);
    setJobFormData({
      ...initialPostNewJobFormData,
    });
    setShowJobDialog(false);
  };

  function handleAddNewJob() {
    if (!profileInfo?.isPremiumUser && jobList.length >= 3) {
      toast({
        variant: "destructive",
        title: "Please Get Membership",
        description:
          "You can post the max of 2 jobs unless you opt for membership",
      });
      return;
    }
    setShowJobDialog(true);
  }

  return (
    <div>
      <Button
        onClick={handleAddNewJob}
        className="disabled:opacity-60 mt-6 flex h-11 items-center justify-center px-5"
      >
        Post A Job
      </Button>
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
          <div className="grid w-full gap-4 py-4">
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

export default PostNewJob;
