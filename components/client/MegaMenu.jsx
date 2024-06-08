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

export function MegaMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="group hover:text-main transition cursor-pointer inline-flex h-9 w-max items-center rounded-md px-2 py-2 text-sm font-medium">
          Browse
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center justify-between bg-sky-600 text-white">
          Browse <FaFirefoxBrowser />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/candidates">Candidates</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/jobs">Jobs</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
