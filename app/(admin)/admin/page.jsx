import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { fetchProfile } from "@/actions/create-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";

import RecentJobs from "@/components/admin/RecentJobs";
import RecentUsers from "@/components/admin/RecentUsers";
import { getRecentJobs, getRecentProfiles } from "@/actions/adminAction";

export default async function Dashboard() {
  // getting logged-in user from clerk
  const user = await currentUser();

  const profileInfo = await fetchProfile(user?.id);

  const { recentJobs, jobCountThisWeek, jobCountLastWeek } =
    await getRecentJobs();
  const { recentProfiles, profileCountThisMonth, profileCountLastMonth } =
    await getRecentProfiles();

  if (profileInfo && profileInfo?.isAdmin !== true) redirect("/");

  // Calculate percentage changes with zero check
  const jobPercentageChange =
    jobCountLastWeek === 0
      ? 100
      : ((jobCountThisWeek - jobCountLastWeek) / jobCountLastWeek) * 100;

  const profilePercentageChange =
    profileCountLastMonth === 0
      ? 100
      : ((profileCountThisMonth - profileCountLastMonth) /
          profileCountLastMonth) *
        100;

  if (profileInfo && profileInfo?.isAdmin !== true) redirect("/");

  return (
    <div className="w-full">
      <div className="flex items-center pb-2 border-b">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="pt-4 grid sm:flex gap-2 w-full items-start">
        <div className="grid w-full md:grid-cols-2 gap-2">
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-xl">{jobCountThisWeek} jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {jobCountLastWeek === 0
                  ? "New jobs this month"
                  : `${
                      jobPercentageChange >= 0 ? "+" : ""
                    }${jobPercentageChange.toFixed(2)}% from last month`}
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={Math.abs(jobPercentageChange)}
                aria-label={`${Math.abs(jobPercentageChange)}% change`}
              />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-xl">
                {profileCountThisMonth} users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {profileCountLastMonth === 0
                  ? "New users this month"
                  : `${
                      profilePercentageChange >= 0 ? "+" : ""
                    }${profilePercentageChange.toFixed(2)}% from last month`}
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={Math.abs(profilePercentageChange)}
                aria-label={`${Math.abs(profilePercentageChange)}% change`}
              />
            </CardFooter>
          </Card>
          <RecentJobs latestJobs={recentJobs} />
        </div>
        <RecentUsers latestProfiles={recentProfiles} />
      </div>
    </div>
  );
}
