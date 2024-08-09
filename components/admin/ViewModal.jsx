"use client";
import React from "react";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const ViewModal = ({ row, showActionDialog, setShowActionDialog }) => {
  const { original } = row;
  console.log(original, "original");

  const onClose = () => {
    setShowActionDialog(false);
  };

  return (
    <Dialog open={showActionDialog} onOpenChange={onClose}>
      <DialogContent className="p-8 overflow-y-auto max-h-[80vh] max-w-[90%] md:max-w-[80%] mx-auto">
        <DialogTitle>Profile Details </DialogTitle>
        <div className="grid md:grid-cols-2 gap-2 border-b pb-3">
          <div className="border shadow flex px-2 items-center rounded gap-4 py-2">
            Profile Photo
            <Image
              src={original?.avatarUrl}
              alt="avatar"
              width={100}
              height={100}
            />
          </div>
          <div className="border shadow flex px-2 items-center rounded gap-4 py-2">
            ID/Passport
            <Image src={original?.idUrl} alt="id" width={100} height={100} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
          <div className="text-muted-foreground">
            Name:{" "}
            <span className="text-gray-700 font-semibold">
              {original?.fullName}
            </span>
          </div>
          <div className="text-muted-foreground">
            Email:{" "}
            <span className="text-gray-700 font-semibold">
              {original?.email}
            </span>
          </div>
          <div className="text-muted-foreground">
            Phone:{" "}
            <span className="text-gray-700 font-semibold">
              {original?.phoneNumber}
            </span>
          </div>
          <div className="text-muted-foreground">
            Gender:{" "}
            <span className="text-gray-700 font-semibold">
              {original?.gender}
            </span>
          </div>
          <div className="text-muted-foreground">
            Date of Birth:{" "}
            <span className="text-gray-700 font-semibold">
              {moment(original?.dateOfBirth).format("MMMM Do, YYYY")}
            </span>
          </div>
          <div className="text-muted-foreground">
            Address:{" "}
            <span className="text-gray-700 font-semibold">
              {original?.address}
            </span>
          </div>
          <div className="text-muted-foreground">
            City:{" "}
            <span className="text-gray-700 font-semibold">
              {original?.city}
            </span>
          </div>
          <div className="text-muted-foreground">
            Membership Type:{" "}
            <span className="text-gray-700 font-semibold">
              {original?.memberShipType}
            </span>
          </div>
          <div className="text-muted-foreground">
            membership Start Date:{" "}
            <span className="text-gray-700 font-semibold">
              {moment(original?.membershipStartDate).format("MMMM Do, YYYY")}
            </span>
          </div>
          <div className="text-muted-foreground">
            Membership End Date:{" "}
            <span className="text-gray-700 font-semibold">
              {moment(original?.membershipEndDate).format("MMMM Do, YYYY")}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-4">
            Is Admin:{" "}
            <span className="text-gray-700 font-semibold">
              {original?.isAdmin ? (
                <p className="text-green-600">Yes</p>
              ) : (
                <p className="text-red-600">No</p>
              )}
            </span>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full text-right">
            <Button onClick={onClose} className="bg-red-500">
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;
