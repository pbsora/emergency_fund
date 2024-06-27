import { User } from "@/lib/Types & Interfaces";
import API from "@/utils/api";
import ImageForm from "./ImageForm";
import { Suspense } from "react";

const ImageChange = async () => {
  const userInfo: User = await API.get("/auth/info").then(
    (res) => res.json()
  );

  return (
    <div className="flex ml-10 mt-10 gap-6 w-2/4 items-center">
      <img
        src={userInfo.profilePicture}
        className="aspect-square size-24 rounded-full object-cover"
      />
      <ImageForm />
    </div>
  );
};
export default ImageChange;
