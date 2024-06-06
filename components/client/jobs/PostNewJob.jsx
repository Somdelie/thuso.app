"use client";
import { postNewJobAction } from "@/actions";
import Form from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { Save } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useState } from "react";

const PostNewJob = ({ profileInfo, user }) => {
  const [showJobDialog, setShowJobDialog] = useState();
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  const isEmptyValues = () => {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control]?.trim() !== ""
    );
  };

  const createNewJob = async () => {
    await postNewJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );
    setJobFormData({
      ...initialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
    setShowJobDialog(false);
  };

  return (
    <div>
      <Button
        onClick={() => setShowJobDialog(true)}
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
            companyName: profileInfo?.recruiterInfo?.companyName,
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
                  <Save className="mr-4" />
                  Save
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
