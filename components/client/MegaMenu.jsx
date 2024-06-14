"use client";
import { FaFirefoxBrowser } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

export function MegaMenu({ setShowSidebar }) {
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  return (
    <DropdownMenu open={showMegaMenu} onOpenChange={setShowMegaMenu}>
      <DropdownMenuTrigger asChild>
        <span className="group px-4 w-full hover:text-white hover:bg-sky-600 md:hover:bg-transparent text-lg md:hover:text-main transition cursor-pointer inline-flex h-9 md:w-max items-center rounded-md md:px-2 py-2 md:text-sm font-medium">
          Browse
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center justify-between bg-sky-600 text-white">
          Browse <FaFirefoxBrowser />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setShowMegaMenu(false)}>
          <Link href="/candidates" onClick={() => setShowSidebar(false)}>
            Candidates
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setShowMegaMenu(false)}>
          <Link href="/jobs" onClick={() => setShowSidebar(false)}>
            Jobs
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
