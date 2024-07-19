import AuthNavbar from "@/components/auth/AuthNavbar";
import { ReactNode } from "react";

const AuthLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div>
      <AuthNavbar />
      {children}
    </div>
  );
};
export default AuthLayout;
