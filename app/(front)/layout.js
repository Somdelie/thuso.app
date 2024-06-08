import { fetchProfile } from "@/actions";
import Navbar from "@/components/client/Navbar";
import { currentUser } from "@clerk/nextjs/server";

export default async function ClientLayout({ children }) {
  // getting logged-in user from clerk
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      <Navbar
        user={JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
      />
      {children}
    </div>
  );
}
