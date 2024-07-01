import { ReactNode } from "react";

import { API } from "@/utils/api";
import Sidebar from "@/components/dashboard/Sidebar/SidebarDesktop";
import Navbar from "@/components/NavbarMobile";

const RootLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const res = await API.get("auth/info").then((res) =>
    res.json()
  );

  return (
    <div className="flex flex-col lg:flex-row max-w-screen min-h-screen dark:bg-zinc-950/50">
      <Navbar />
      <Sidebar user={res} />
      {children}
    </div>
  );
};
export default RootLayout;
