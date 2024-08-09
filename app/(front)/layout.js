import { fetchCategories } from "@/actions/categoryAction";
import { fetchProfile } from "@/actions/create-profile";
import { getPremiumCandidates } from "@/actions/homePageAction";
import Navbar from "@/components/client/Navbar";
import Footer from "@/components/common/Footer";
import MegaMenu from "@/components/common/MegaMenu";
import { currentUser } from "@clerk/nextjs/server";

export default async function ClientLayout({ children }) {
  // getting logged-in user from clerk
  const user = await currentUser();
  const premiumProfiles = await getPremiumCandidates();
  const profileInfo = await fetchProfile(user?.id);
  const categories = await fetchCategories();
  // Ensure user and profileInfo are plain objects
  const plainUser = user ? JSON.parse(JSON.stringify(user)) : null;
  const plainProfileInfo = profileInfo
    ? JSON.parse(JSON.stringify(profileInfo))
    : null;

  return (
    <div className="mx-auto w-full ">
      <Navbar user={plainUser} profileInfo={plainProfileInfo} />
      <div className="w-full border-b bg-heroBg text-muted-foreground sticky z-30 top-16 left-0">
        <MegaMenu categories={categories} premiumProfiles={premiumProfiles} />
      </div>
      <main className=" overflow-x-hidden min-h-[55vh]">{children}</main>
      <Footer />
    </div>
  );
}
