import { fetchProfile } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  // getting logged-in user from clerk
  const user = await currentUser();

  // we define user profile patties
  const profileInfo = await fetchProfile(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return <section>Hello {user?.firstName}</section>;
}
