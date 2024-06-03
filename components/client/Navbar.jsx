"use client";

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Navbar = ({ user }) => {
  const menuItems = [
    {
      Label: "Home",
      path: "/",
      show: true,
    },
    // this only shown if the user is not logged in
    {
      Label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      Label: "Register",
      path: "/sign-up",
      show: !user,
    },
    // this only shown if the user is logged in
    {
      Label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      Label: "Activity",
      path: "/activity",
      show: user,
    },
    {
      Label: "Membership",
      path: "/membership",
      show: user,
    },
    {
      Label: "Account",
      path: "/account",
      show: user,
    },
  ];

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        {/* //this is a mobile navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navbar Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="mr-6 hidden lg:flex" href="#">
              THUSO.COM
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems?.map((menuItem) =>
                menuItem.show ? (
                  <Link
                    href={menuItem.path}
                    key={menuItem.Label}
                    className="flex w-full items-center py-2 text-lg font-semibold px-4 rounded-lg hover:bg-sky-600 hover:text-white"
                  >
                    {menuItem.Label}
                  </Link>
                ) : null
              )}
            </div>
            <UserButton />
          </SheetContent>
        </Sheet>
        <Link className="hidden md:flex mr-6" href="/">
          Thuso.com
        </Link>
        {/* this is a medium and large screen navigation */}
        <nav className="ml-auto hidden md:flex gap-6">
          {menuItems?.map((menuItem) =>
            menuItem.show ? (
              <Link
                href={menuItem.path}
                key={menuItem.Label}
                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
              >
                {menuItem.Label}
              </Link>
            ) : null
          )}
          {/* this is a logged in user button */}
          <UserButton />
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
