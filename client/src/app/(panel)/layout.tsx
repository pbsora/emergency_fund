import { ReactNode } from "react";

import { API } from "@/utils/api";
import Sidebar from "@/components/dashboard/Sidebar/SidebarDesktop";
import Navbar from "@/components/dashboard/NavbarMobile";
import { Parse } from "@/lib/helpers";

const DashboardLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const res = await API.get("auth/info").then((res) =>
    Parse(res)
  );

  return (
    <div className="flex flex-col lg:flex-row max-w-screen min-h-screen dark:bg-zinc-950/50 max-h-screen">
      <Navbar />
      <Sidebar user={res} />
      {children}
    </div>
  );
};
export default DashboardLayout;
