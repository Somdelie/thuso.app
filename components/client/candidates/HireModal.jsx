/* eslint-disable react/no-unescaped-entities */
"use client";
import { createProposalFeedAction } from "@/actions/hiringAction";
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
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const HireModal = ({
  setOpenHireModal,
  candidate,
  profileInfo,
  openHireModal,
  user,
}) => {
  const phoneNumber = user?.phoneNumbers?.map((number) => number.phoneNumber);

  const [formData, setFormData] = useState({
    fullName: profileInfo?.fullName,
    email: profileInfo?.email,
    phoneNumber: "",
    description: "",
  });

  const handleSendProposal = async () => {
    await createProposalFeedAction(
      {
        profileId: profileInfo?.id,
        fullName: profileInfo?.fullName,
        email: profileInfo?.email,
        phoneNumber: formData.phoneNumber,
        jobDescription: formData?.description,
      },
      "/activity"
    );
    setOpenHireModal(false);
  };

  return (
    <Dialog
      open={openHireModal}
      onOpenChange={() => {
        setOpenHireModal(false);
        setFormData({
          description: "",
        });
      }}
    >
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Proposal Info</DialogTitle>
          <DialogDescription>
            Fill in the details to hire{" "}
            <span className="font-semibold">{candidate?.fullName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="fullName"
              className=" whitespace-nowrap text-muted-foreground"
            >
              Your Name
            </Label>
            <Input
              id="fullName"
              defaultValue={profileInfo?.fullName}
              className="col-span-3 bg-sky-200"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className=" whitespace-nowrap text-muted-foreground"
            >
              Your Email
            </Label>
            <Input
              id="email"
              defaultValue={profileInfo?.email}
              className="col-span-3 bg-sky-200"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="phoneNumber"
              className=" whitespace-nowrap text-muted-foreground"
            >
              Your Phone Number
            </Label>
            <Input
              id="phoneNumber"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  phoneNumber: event.target.value,
                })
              }
              value={formData?.phoneNumber}
              placeholder="0727077541"
              className="col-span-3 bg-sky-200"
            />
          </div>
          <div className="">
            <Textarea
              name="description"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  description: event.target.value,
                })
              }
              value={formData?.description}
              className="resize-none "
              placeholder="Describe the job information"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSendProposal}
            disabled={formData?.description.trim() === ""}
          >
            Send Job Info
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HireModal;
