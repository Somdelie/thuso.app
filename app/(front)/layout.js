import { fetchProfile } from "@/actions/create-profile";
import Navbar from "@/components/client/Navbar";
import Footer from "@/components/common/Footer";
import MegaMenu from "@/components/common/MegaMenu";
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
      <div className="w-full border-b sticky z-30 top-16 left-0 bg-heroBg border-navblue">
        <MegaMenu />
      </div>
      <main className=" overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
