import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, EyeIcon } from "lucide-react";
import React from "react";
import Icon from "./Icon";

const RecruiterJobCard = ({ jobItem }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg w-full md:text-xl flex items-center gap-3 max-w-full text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
          <Icon /> <span className="flex-grow w-full"> {jobItem?.title} </span>
          <span className="text-sm text-gray-400">10 applicants</span>
        </CardTitle>
        <CardDescription>
          {jobItem?.description.substring(0, 45)}...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <EyeIcon className="mr-2 h-4 w-4" /> View Job Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecruiterJobCard;
