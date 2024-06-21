import { ReactNode } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import { API } from "@/utils/api";

const RootLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const res = await API.get("auth/info").then((res) =>
    res.json()
  );

  return (
    <div className="flex">
      <div>
        <Sidebar user={res} />
      </div>
      {children}
    </div>
  );
};
export default RootLayout;
