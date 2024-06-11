"use client";

import { membershipPlans } from "@/utils";
import MembershipCard from "./MembershipCard";

const Membership = ({ profileInfo }) => {
  return (
    <div className="">
      <div className="flex items-baseline justify-between py-4">
        <h2 className="text-lg text-center w-full font-bold tracking-tight text-gray-900">
          Choose Your Best Plan
        </h2>
      </div>
      <div className="py-16 pb-24 pt-4">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
            {membershipPlans?.map((plan, i) => (
              <MembershipCard key={i} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;