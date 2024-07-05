import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const RecentUsers = ({ latestProfiles }) => {
  const getInitials = (fullName) => {
    const [firstName, lastName] = fullName.split(" ");
    return `${firstName[0]}${lastName[0]}`;
  };
  return (
    <Card x-chunk="dashboard-01-chunk-5" className="md:min-h-screen">
      <CardHeader>
        <CardTitle>Recent Profiles</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {latestProfiles.map((profile) => (
          <div
            key={profile?.id}
            className="flex border-b py-2 hover:bg-muted items-center gap-4"
          >
            <Avatar className="h-9 w-9 sm:flex">
              <AvatarImage
                src={profile?.avatarUrl || "/default-avatar.png"}
                alt={`${profile?.fullName}`}
              />
              <AvatarFallback className="bg-orange-500 text-white font-semibold">
                {getInitials(profile?.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">{`${profile?.fullName}`}</p>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentUsers;
