import { fetchProfile } from "@/actions/create-profile";
import FeedsList from "@/components/client/feeds/FeedsList";
import prismaDB from "@/utils/dbConnect";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const FeedsPage = async () => {
  const user = await currentUser();

  const profileInfo = await fetchProfile(user?.id);

  if (!profileInfo) redirect("/onboard");

  const allFeedPosts = await prismaDB.feed.findMany({
    include: { likes: true },
  });

  // console.log(allFeedPosts);

  return (
    <FeedsList
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      allFeedPosts={allFeedPosts}
    />
  );
};

export default FeedsPage;
