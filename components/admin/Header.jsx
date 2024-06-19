"use client";
import { LineChart, Menu, Search, Users } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { MdDashboard, MdWork } from "react-icons/md";
import { usePathname } from "next/navigation";
import { AdminLinks } from "@/utils";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center w-full gap-4 z-50 bg-white/90 border-b px-4 lg:h-[60px] lg:px-6 sticky top-0 left-0">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <div className="w-full border-b pb-2">
              <Link className="flex items-center text-sky-600" href="/">
                <Image
                  src="/thuso-logo.png"
                  alt="logo"
                  width={30}
                  height={40}
                  className="aspect-auto"
                />
                <span className="font-semibold"> Thuso.com</span>
              </Link>
            </div>
            {AdminLinks?.map((item, i) => (
              <Link
                key={i}
                href={item?.link}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <span>{item?.icon}</span>
                {item?.title}
              </Link>
            ))}
          </nav>
          <div className="mt-auto"></div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </div>
      <UserButton />
    </header>
  );
};

export default Header;
