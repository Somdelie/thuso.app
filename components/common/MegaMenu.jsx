import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { fetchCategories } from "@/actions/categoryAction";

const MegaMenu = async () => {
  const categories = await fetchCategories();
  //   console.log(categories);
  return (
    <NavigationMenu className="max-w-[90%] mx-auto justify-start">
      <NavigationMenuList>
        <NavigationMenuItem className="text-muted-foreground">
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent className="p-6">
            <NavigationMenuList className="grid w-full">
              {categories.map((category, index) => (
                <NavigationMenuItem
                  key={index}
                  className="hover:bg-navblue hover:text-white w-full px-3 py-1 rounded"
                >
                  <NavigationMenuLink
                    href={`/browse/${category.id}`}
                    className="whitespace-nowrap"
                  >
                    {category?.categoryName}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-muted-foreground">
          <NavigationMenuTrigger>Faq</NavigationMenuTrigger>
          <NavigationMenuContent className="p-6">
            <NavigationMenuList className="grid w-full">
              {categories.map((category, index) => (
                <NavigationMenuItem
                  key={index}
                  className="hover:bg-navblue hover:text-white w-full px-3 py-1 rounded"
                >
                  <NavigationMenuLink
                    href={`/browse/${category.id}`}
                    className="whitespace-nowrap"
                  >
                    {category?.categoryName}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-muted-foreground">
          <NavigationMenuTrigger>Help</NavigationMenuTrigger>
          <NavigationMenuContent className="p-6">
            <NavigationMenuList className="grid w-full">
              {categories.map((category, index) => (
                <NavigationMenuItem
                  key={index}
                  className="hover:bg-navblue hover:text-white w-full px-3 py-1 rounded"
                >
                  <NavigationMenuLink
                    href={`/browse/${category.id}`}
                    className="whitespace-nowrap"
                  >
                    {category?.categoryName}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
