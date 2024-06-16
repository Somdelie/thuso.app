import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { fetchProfile } from "@/actions/create-profile";

export default async function Dashboard() {
  // getting logged-in user from clerk
  const user = await currentUser();

  const profileInfo = await fetchProfile(user?.id);

  if (profileInfo && profileInfo?.isAdmin !== true) redirect("/");

  return (
    <div className="">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </div>
  );
}
