"use client";
import { updateProfile } from "@/actions/create-profile";
import {
  createPriceIdAction,
  createStripePaymentAction,
} from "@/actions/payment";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
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

    // Calculate membership end date based on current date and membership type
    const membershipEndDate = new Date();
    membershipEndDate.setMonth(
      membershipEndDate.getMonth() + // Add months
        (fetchCurrentPlanFromSessionStorage?.type === "Basic"
          ? 1 // Adjust the number of months based on membership type
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
        memberShipEndDate: membershipEndDate.toISOString(), // Use the calculated end date
      },
      "/membership"
    );
    // Call updateMembership after successful payment
  }

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("status") === "success") {
      updateMembership();
      toast.success("🦄 Payment Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setPaymentSuccess(true); // Set state to indicate that membership has been updated
    }
  }, []); // Empty dependency array ensures this effect runs only once

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
        <CardFooter className="h-[15%] w-full">
          <button
            onClick={() => handlePayment(plan)}
            role="button"
            className={`${getButtonClass(plan?.type)} w-full font-semibold`}
          >
            <span className="button-text">Get {plan?.type}</span>
          </button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MembershipCard;
