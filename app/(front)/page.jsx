import { fetchProfile } from "@/actions/create-profile";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  // getting logged-in user from clerk
  const user = await currentUser();

  // we define user profile patties
  const profileInfo = await fetchProfile(user?.id);

  // console.log(profileInfo);

  if (user && !profileInfo?.id) redirect("/onboard");

  return <section>Hello {user?.firstName}</section>;
}
