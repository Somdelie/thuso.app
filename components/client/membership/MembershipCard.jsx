"use client";
import { updateProfile } from "@/actions/create-profile";
import {
  createPriceIdAction,
  createStripePaymentAction,
} from "@/actions/payment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51IkeFOCXOHdk1RF14N5WX41QpLoCHT4XH9qJbZ9dUMu8NnnreY8iL7GjP3jvogMIdMMv869xZX5cPzj4WUsGQIe700qkubyIeK"
);

const MembershipCard = ({ plan, profileInfo }) => {
  const searchParams = useSearchParams();

  const getButtonClass = (planType) => {
    switch (planType) {
      case "Basic":
        return "basic-button";
      case "Gold":
        return "golden-button";
      case "Premium":
        return "platinum-button";
      default:
        return "default-button";
    }
  };

  const isButtonDisabled = (planType) => {
    switch (profileInfo?.memberShipType) {
      case "Basic":
        return planType === "Basic";
      case "Gold":
        return planType === "Basic" || planType === "Gold";
      case "Premium":
        return true;
      default:
        return false;
    }
  };

  const getButtonText = (planType) => {
    switch (profileInfo?.memberShipType) {
      case "Basic":
        return planType === "Basic"
          ? `Get ${planType}`
          : `Upgrade to ${planType}`;
      case "Gold":
        return planType === "Gold"
          ? `Get ${planType}`
          : `Upgrade to ${planType}`;
      case "Premium":
        return `Get ${planType}`;
      default:
        return `Get ${planType}`;
    }
  };

  const shouldHideButton = (planType) => {
    switch (profileInfo?.memberShipType) {
      case "Basic":
        return planType === "Basic";
      case "Gold":
        return planType === "Basic" || planType === "Gold";
      case "Premium":
        return true;
      default:
        return false;
    }
  };

  async function handlePayment(getCurrentPlan) {
    const stripe = await stripePromise;
    const extractPriceId = await createPriceIdAction({
      amount: Number(getCurrentPlan?.price),
    });

    if (extractPriceId) {
      sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
      const result = await createStripePaymentAction({
        lineItems: [
          {
            price: extractPriceId?.id,
            quantity: 1,
          },
        ],
      });
      await stripe.redirectToCheckout({
        sessionId: result?.id,
      });
    }

    console.log(extractPriceId);
  }

  async function updateMembership() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(
      sessionStorage.getItem("currentPlan")
    );

    const membershipEndDate = new Date();
    membershipEndDate.setMonth(
      membershipEndDate.getMonth() +
        (fetchCurrentPlanFromSessionStorage?.type === "Basic"
          ? 1
          : fetchCurrentPlanFromSessionStorage?.type === "Gold"
          ? 2
          : 5)
    );

    await updateProfile(
      profileInfo?.id,
      {
        isPremiumUser: true,
        memberShipType: fetchCurrentPlanFromSessionStorage?.type,
        memberShipStartDate: new Date().toISOString(),
        memberShipEndDate: membershipEndDate.toISOString(),
      },
      "/membership"
    );
  }
  const { toast } = useToast();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("status") === "success") {
      updateMembership();

      setPaymentSuccess(true);
      redirect("/membership");
    }
  }, []);

  if (paymentSuccess === true) {
    return toast({
      title: "Your now a premium user",
      description: "well done",
    });
  }

  console.log(profileInfo, "Member Updated");

  return (
    <Card className="p-2 grid ">
      <div className="bg-[#ecf0ff] min-h-full">
        <CardHeader className="bg-[#ecf0ff] h-[20%] rounded relative">
          <CardTitle className="text-lg text-[#425675] mt-3">
            {plan?.heading}
          </CardTitle>
          <div className="absolute right-0 -top-2 rounded-l-full bg-[#bed6fb] text-[#425475] px-4 py-2">
            <span className="font-semibold">${plan?.price}</span> /m
          </div>
        </CardHeader>
        <CardContent className="h-[65%] px-4 text-[#707a91] text-sm">
          <p>{plan?.desc}</p>
          <div className="mt-4 flex flex-col h-full flex-shrink">
            {plan?.benefits?.map((item, i) => (
              <div key={i} className="flex items-center gap-1">
                <IoCheckmarkCircleSharp size={24} className="text-[#1FCAC5]" />
                <div className="flex gap-1">
                  <span
                    className={`${item?.before ? "font-semibold ml-1" : ""}`}
                  >
                    {item?.before}
                  </span>
                  {item?.list}
                  <span className="font-semibold">{item?.after}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        {!shouldHideButton(plan?.type) && (
          <CardFooter className="h-[15%] w-full">
            <Button
              onClick={() => handlePayment(plan)}
              className={`${getButtonClass(plan?.type)} w-full font-semibold`}
              disabled={isButtonDisabled(plan?.type)}
            >
              <span className="button-text">{getButtonText(plan?.type)}</span>
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  );
};

export default MembershipCard;
