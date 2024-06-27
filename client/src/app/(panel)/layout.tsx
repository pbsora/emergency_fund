import { ReactNode } from "react";

import { API } from "@/utils/api";
import Sidebar from "@/components/dashboard/Sidebar/SidebarDesktop";

const RootLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const res = await API.get("auth/info").then((res) =>
    res.json()
  );

  return (
    <div className="flex max-w-screen min-h-screen">
      <Sidebar user={res} />
      {children}
    </div>
  );
};
export default RootLayout;
