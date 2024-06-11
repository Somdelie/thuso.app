import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const MembershipCard = ({ plan }) => {
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
