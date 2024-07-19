"use client";

import API from "@/utils/api";

const RefreshToken = () => {
  const refresh = async () => {
    const res = await fetch(
      `http://localhost:5065/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );
  };

  return (
    <button
      className="my-10"
      onClick={async () => refresh()}
    >
      RefreshToken
    </button>
  );
};
export default RefreshToken;
