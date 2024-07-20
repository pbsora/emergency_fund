import { ReactNode } from "react";

import { API } from "@/utils/api";
import Sidebar from "@/components/dashboard/Sidebar/SidebarDesktop";
import Navbar from "@/components/NavbarMobile";
import { Parse } from "@/lib/helpers";

const DashboardLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  // let data = await isAuthenticated();

  // if (!data) {
  //   const newToken = await refreshToken();
  //   if (newToken) {
  //     data = await isAuthenticated();
  //   } else {
  //     redirect("/login");
  //   }
  // }

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
