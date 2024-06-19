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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RecentJobs from "@/components/admin/RecentJobs";
import RecentUsers from "@/components/admin/RecentUsers";

export default async function Dashboard() {
  // getting logged-in user from clerk
  const user = await currentUser();

  const profileInfo = await fetchProfile(user?.id);

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
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-4xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label="12% increase" />
            </CardFooter>
          </Card>
          <RecentJobs />
        </div>
        <RecentUsers />
      </div>
    </div>
  );
}
