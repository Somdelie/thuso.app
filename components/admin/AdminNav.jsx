"use client";
import { AdminLinks } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminNav = () => {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
      {AdminLinks?.map((item, i) => (
        <Link
          key={i}
          href={item?.link}
          className={`${
            pathname === item?.link
              ? "flex items-center bg-sky-600 text-white gap-3 rounded px-3 py-2 text-muted-foreground transition-all "
              : "flex items-center hover:bg-sky-600 hover:text-white gap-3 rounded px-3 py-2 text-muted-foreground transition-all "
          }`}
        >
          <span>{item?.icon}</span>
          {item?.title}
        </Link>
      ))}
    </nav>
  );
};

export default AdminNav;
