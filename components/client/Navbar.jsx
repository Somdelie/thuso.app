"use client";

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { MegaMenu } from "./MegaMenu";
import { useState } from "react";
import Image from "next/image";

const Navbar = ({ user, profileInfo }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const menuItems = [
    // this only shown if the user is not logged in
    {
      Label: "Feeds",
      path: "/feeds",
      show: true,
    },

    {
      Label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "CANDIDATE",
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
    {
      Label: "Admin",
      path: "/admin",
      show: profileInfo?.isAdmin === true,
    },
  ];

  const rightItems = [
    {
      Label: "Login",
      path: "/sign-in",
      show: !user,
    },
  ];

  return (
    <header className="flex bg-heroBg text-gray-900 shadow-sm text-muted-foreground sticky top-0 border-b justify-between px-6 z-30 items-center h-16">
      {/* //this is a mobile navigation */}
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <AlignJustify className="h-6 w-6" />
            <span className="sr-only">Toggle Navbar Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="w-full border-b-2">
            <Link
              className="mr-6 lg:flex"
              href="/"
              onClick={() => setShowSidebar(false)}
            >
              <Image
                src="/t-logo.png"
                alt="logo"
                width={40}
                height={60}
                className="aspect-auto"
              />
            </Link>
          </div>

          <div className="grid gap-2 py-6">
            <MegaMenu setShowSidebar={setShowSidebar} />
            {menuItems?.map((menuItem) =>
              menuItem.show ? (
                <Link
                  href={menuItem.path}
                  key={menuItem.Label}
                  onClick={() => setShowSidebar(false)}
                  className="flex w-full items-center py-2 text-lg font-semibold px-4 rounded-lg hover:bg-sky-600 hover:text-white"
                >
                  {menuItem.Label}
                </Link>
              ) : null
            )}
          </div>
          {/* <UserButton /> */}
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <Link className="hidden md:flex items-center mr-6 gap-1" href="/">
          <Image
            src="/t-logo.png"
            alt="logo"
            width={40}
            height={60}
            className="aspect-auto"
          />
          <h2 className="text-orangeBg drop-shadow-md text-xl font-black transition hover:underline">
            THUSOO
          </h2>
        </Link>
      </div>
      {/* this is a medium and large screen navigation */}
      <nav className=" hidden w-full justify-center md:flex gap-2">
        <Link
          href="/"
          className="group inline-flex hover:text-main transition h-9 w-max items-center rounded-md px-2 py-2 text-sm font-medium"
        >
          Home
        </Link>

        {/* this is mega menu */}
        <MegaMenu />
        {menuItems?.map((menuItem) =>
          menuItem.show ? (
            <Link
              href={menuItem.path}
              key={menuItem.Label}
              className="group inline-flex hover:text-main transition h-9 w-max items-center rounded-md px-2 py-2 text-sm font-medium"
            >
              {menuItem.Label}
            </Link>
          ) : null
        )}

        {/* this is a logged in user button */}
      </nav>
      <div className=" flex justify-end items-center">
        {rightItems?.map((menuItem) =>
          menuItem.show ? (
            <Link
              href={menuItem.path}
              key={menuItem.Label}
              className="group inline-flex bg-myMain rounded-full px-6 transition py-1 shadow text-white w-max items-center text-sm font-medium"
            >
              {menuItem.Label}
            </Link>
          ) : null
        )}
      </div>
      <UserButton />
    </header>
  );
};

export default Navbar;
