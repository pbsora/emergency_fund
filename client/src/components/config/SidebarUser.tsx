"use client";

import { useAppSelector } from "@/hooks/ReduxHooks";

const SidebarUser = () => {
  const { username } = useAppSelector(
    (state) => state.user.value
  );
  return <div>{username}</div>;
};
export default SidebarUser;
