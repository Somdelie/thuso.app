import Image from "next/image";
import React from "react";

const Icon = () => {
  return (
    <div className="w-16 h-16">
      <Image
        src="/case.png"
        alt="JobIcon"
        width={300}
        height={300}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Icon;
