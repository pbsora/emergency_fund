"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import ImageForm from "./ImageForm";
import { useAppSelector } from "@/hooks/ReduxHooks";

const ImageChange = () => {
  const { profilePicture } = useAppSelector(
    (state) => state.user.value
  );

  return (
    <div className="flex flex-col sm:flex-row md:flex-row  gap-6 w-full sm:w-3/4 md:w-3/4 lg:w-2/4 m-auto md:m-0">
      <ImageForm />
      <Avatar className="size-24">
        <AvatarImage
          src={profilePicture}
          alt={"user profile picture"}
          className="aspect-square size-24 rounded-full object-cover mt-3"
        />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  );
};
export default ImageChange;
