"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar } from "@mui/material";

const megaMenu = [
  {
    title: "Popular Services",
    content: [
      {
        title: "Painting",
        slug: "painting",
        desc: " Create and improve artwork. Industry-specific roles available. Openings in various industries.",
      },
      {
        title: "Plumbing",
        slug: "plumbing",
        desc: "Build and maintain water-resistant homes. Industry-specific roles available. Openings in various industries.",
      },
      {
        title: "Electrical Work",
        slug: "electrical-work",
        desc: "Install and maintain electrical systems in residential and commercial buildings. Industry-specific roles available. Openings in various industries.",
      },
      {
        title: "Construction",
        slug: "construction",
        desc: "Build and maintain residential and commercial buildings. Industry-specific roles available. Openings in various industries.",
      },
      {
        title: "Mechanical Work",
        slug: "mechanical-work",
        desc: "Install and maintain mechanical systems in residential and commercial buildings. Industry-specific roles available. Openings in various industries.",
      },
      {
        title: "Cleaning",
        slug: "cleaning",
        desc: "Clean and maintain residential and commercial buildings. Industry-specific roles available. Openings in various industries.",
      },
      {
        title: "Marketing",
        slug: "marketing",
        desc: "Promote and sell products and services. Opportunities in various industries.",
      },
      {
        title: "UX/UI Designer",
        slug: "ux-ui-designer",
        desc: "Design user-friendly interfaces for web and mobile applications. Opportunities in creative agencies.",
      },
    ],
  },
  {
    title: "Locations",
    content: [
      {
        title: "Remote",
        slug: "remote",
        desc: "Find remote job opportunities across various industries. Flexible working conditions.",
      },
      {
        title: "New York",
        slug: "new-york",
        desc: "Explore job openings in New York City. Opportunities in finance, tech, and healthcare.",
      },
      {
        title: "San Francisco",
        slug: "san-francisco",
        desc: "Tech hub with numerous job openings in software development and startups.",
      },
      {
        title: "London",
        slug: "london",
        desc: "Positions available in finance, marketing, and more. Join top companies in London.",
      },
    ],
  },
];

export default function MegaMenu({ categories, premiumProfiles }) {
  console.log(premiumProfiles);
  // console.log(megaMenu);
  return (
    <NavigationMenu className="md:w-[92%] w-full mx-auto">
      <NavigationMenuList className=" w-full">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">Categories</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-heroBg border-2 border-myMain w-full">
            <ul className="grid w-full gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {categories?.map((category) => (
                <NavigationMenuLink
                  key={category?.id}
                  href={`/category/${category?.id}`}
                  className="text-muted-foreground hover:text-navblue transition duration-75"
                >
                  {category?.categoryName}
                </NavigationMenuLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">
            Top Candidates
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-heroBg border-2 border-myMain w-full">
            <ul className="grid w-full gap-3 p-4 md:w-[500px] lg:w-[600px] ">
              {premiumProfiles?.map((profile) => (
                <NavigationMenuLink
                  key={profile?.id}
                  href={`/candidates/${profile?.id}`}
                  className="text-muted-foreground w-full hover:bg-white border-b p-4 hover:text-navblue transition duration-75"
                >
                  <div className="text-sm font-medium flex items-center gap-2 text-navblue leading-none">
                    <Avatar>CN</Avatar> {profile?.fullName}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {profile?.skills
                      ?.split(",")
                      .slice(0, 3)
                      .map((skillItem, i) => (
                        <div key={i}>
                          <p className="text-[12px] font-medium text-gray-400">
                            {skillItem},
                          </p>
                        </div>
                      ))}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    <span className="text mt-2 flex items-center gap-1">
                      <p className="text-gray-500 text-xs">
                        Preferred Location
                      </p>
                      {profile?.preferredJobLocation?.substring(0, 18)}
                    </span>
                  </p>
                </NavigationMenuLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {megaMenu?.map((item, i) => (
          <NavigationMenuItem key={i}>
            <NavigationMenuTrigger className="">
              {item?.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-heroBg border-2 border-myMain w-full text-white">
              <ul className="grid w-full gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {item?.content.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={`/candidates/${component?.slug}`}
                  >
                    {component.desc}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none text-black w-full space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium text-navblue leading-none">
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
