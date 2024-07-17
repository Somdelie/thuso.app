import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSpacing({ categories }) {
  console.log(categories, "inside carousel spacing");
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {categories?.map((category, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/5 md:basis-[8%]">
            <span className="whitespace-nowrap">{category}</span>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
