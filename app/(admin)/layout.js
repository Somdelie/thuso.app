import { fetchProfile } from "@/actions/create-profile";
import AdminNav from "@/components/admin/AdminNav";
import Header from "@/components/admin/Header";
import Navbar from "@/components/client/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  Bell,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdDashboard } from "react-icons/md";

export default async function ClientLayout({ children }) {
  // getting logged-in user from clerk
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  if (!profileInfo?.isAdmin) redirect("/");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen sticky top-0 left-0 flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <div className="w-full">
              <Link className="mr-6 flex items-center text-sky-600" href="/">
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
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <AdminNav />
          </div>
          <div className="mt-auto w-full border-t p-4">
            <h3 className="text-sm ">
              <Link
                href="https://cautiousndlovu.co.za/"
                className="underline text-orange-500"
              >
                Somdelie Dev
              </Link>
            </h3>
          </div>
        </div>
      </div>
      <div className="flex w-full overflow-hidden flex-col">
        <Header />
        <main className="flex flex-1 w-[full] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
