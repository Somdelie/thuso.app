import { fetchProfile } from "@/actions/create-profile";
import Navbar from "@/components/client/Navbar";
import { currentUser } from "@clerk/nextjs/server";

export default async function ClientLayout({ children }) {
  // getting logged-in user from clerk
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  // console.log(premiumProfile);

  // console.log(profileInfo, "this is profile info");

  return (
    <div className="mx-auto w-full ">
      <Navbar
        user={JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
      />
      <main className="py-4">{children}</main>
    </div>
  );
}
