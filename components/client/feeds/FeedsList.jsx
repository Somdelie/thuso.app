"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MdPermMedia } from "react-icons/md";
import React, { useEffect, useId, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import { createFeedPostAction } from "@/actions/postAction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const supabaseClient = createClient(
  "https://lyfonawvuwlvyluvlokf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5Zm9uYXd2dXdsdnlsdXZsb2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3MDM0ODksImV4cCI6MjAzMzI3OTQ4OX0.NjIi1BkIEluw_y2YezB7Nf1F2jQo6mlbWCZ57-tcLcA"
);

const FeedsList = ({ user, profileInfo, allFeedPosts }) => {
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    imageURL: "",
  });
  const [uploading, setUploading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleFileChange = (event) => {
    event.preventDefault();
    setImageData(event.target.files[0]);
  };

  const handleFetchImagePublicUrl = (getData) => {
    const { data } = supabaseClient.storage
      .from("thuso-com")
      .getPublicUrl(getData);

    if (data)
      setFormData({
        ...formData,
        imageURL: data.publicUrl,
      });

    console.log(data, "image url");
  };

  const handleUploadImageToSupabase = async () => {
    setUploading(true);
    if (imageData) {
      const { data, error } = await supabaseClient.storage
        .from("thuso-com")
        .upload(`public/${imageData.name}`, imageData, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error uploading image!",
          description: error.message,
        });
        console.error("Error uploading image:", error.message);
      } else {
        handleFetchImagePublicUrl(data.path);
      }
    }
    setUploading(false);
  };

  useEffect(() => {
    handleUploadImageToSupabase();
  }, [imageData]);

  const handleSaveFeedPost = async () => {
    await createFeedPostAction(
      {
        userId: user?.id,
        fullName: profileInfo?.fullName,
        message: formData?.message,
        image: formData?.imageURL,
      },
      "/feed"
    );
  };

  return (
    <div className="py-6">
      <div className="flex pb-3 items-center border-b justify-between">
        <h2 className="font-bold tracking-tight text-gray-950">
          Explore Feeds
        </h2>
        <Button onClick={() => setShowPostDialog(true)}>Add New Post</Button>
      </div>

      <div>
        {allFeedPosts && allFeedPosts.length > 0 ? (
          allFeedPosts.map((feedPostItem) => (
            <Card key={feedPostItem?.id}>
              <CardHeader>
                {
                  <Image
                    src={feedPostItem?.image}
                    alt="image"
                    width={200}
                    height={200}
                    className="aspect-auto"
                  />
                }
              </CardHeader>
              <CardContent>
                <p>{feedPostItem?.message}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex w-full min-h-[55vh] items-center justify-center">
            <h3 className="font-semibold text-2xl">No posts found!</h3>
          </div>
        )}
        <div></div>
      </div>
      <Dialog
        open={showPostDialog}
        onOpenChange={() => {
          setShowPostDialog(false);
          setFormData({
            message: "",
            imageURL: "",
          });
        }}
      >
        <DialogContent className="p-8 max-w-[90%] md:max-w-[80%] mx-auto">
          {/* <Textarea
            name="message"
            onChange={(event) =>
              setFormData({
                ...formData,
                message: event.target.value,
              })
            }
            value={formData?.message}
            className="resize-none h-[200px] my-3 border-none text-[20px] outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="What do you want to talk about?"
          /> */}
          <ReactQuill
            theme="snow"
            name="message"
            onChange={(event) =>
              setFormData({
                ...formData,
                message: event.target.value,
              })
            }
            value={formData?.message}
          />
          <div className="flex mt-4 gap-5 items-center justify-between">
            {imageData ? (
              <div className="w-[40px] h-[40px]">
                <Image
                  src={formData?.imageURL}
                  alt="img"
                  width={200}
                  height={200}
                  className="aspect-auto"
                />
              </div>
            ) : (
              <Label htmlFor="imageURL" className="cursor-pointer">
                {uploading ? "Uploading image..." : <MdPermMedia size={24} />}
                <Input
                  className="hidden"
                  onChange={handleFileChange}
                  id="imageURL"
                  type="file"
                />
              </Label>
            )}
            <Button
              onClick={handleSaveFeedPost}
              disabled={
                formData?.message.trim() === "" ||
                formData?.imageURL === "" ||
                isLoading
              }
            >
              {isLoading ? "Please wait" : "Publish"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedsList;
