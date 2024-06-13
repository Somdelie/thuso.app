"use client";

import { membershipPlans } from "@/utils";
import MembershipCard from "./MembershipCard";
import { Button } from "@/components/ui/button";

const Membership = ({ profileInfo }) => {
  return (
    <div className="">
      <div className="flex items-baseline justify-between py-4">
        <h2 className="text-lg w-full font-bold tracking-tight text-gray-900">
          {profileInfo?.isPremiumUser
            ? "You are a premium user"
            : " Choose Your Best Plan"}
        </h2>
        <div>
          {profileInfo?.isPremiumUser ? (
            <Button>
              {
                membershipPlans.find(
                  (planItem) => planItem.type === profileInfo?.memberShipType
                ).heading
              }
            </Button>
          ) : null}
        </div>
      </div>
      <div className="py-16 pb-24 pt-4">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
            {membershipPlans?.map((plan, i) => (
              <MembershipCard key={i} plan={plan} profileInfo={profileInfo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
