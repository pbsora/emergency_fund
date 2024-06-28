import { User } from "@/lib/Types & Interfaces";
import API from "@/utils/api";
import ImageForm from "./ImageForm";

const ImageChange = async () => {
  const userInfo: User = await API.get("/auth/info").then(
    (res) => res.json()
  );

  return (
    <div className="flex flex-col sm:flex-row md:flex-row lg:ml-10 gap-6 w-full sm:w-3/4 md:w-3/4 lg:w-2/4 m-auto md:m-0">
      <img
        src={userInfo.profilePicture}
        className="aspect-square size-24 rounded-full object-cover mt-3"
      />
      <ImageForm />
    </div>
  );
};
export default ImageChange;
