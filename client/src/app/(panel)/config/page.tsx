import ImageChange from "@/components/config/ImageChange";
import NameForm from "@/components/config/NameForm";

const Config = () => {
  return (
    <div className="flex flex-col gap-10 w-full px-3 md:pl-10 pt-10">
      <h1 className="text-3xl font-semibold pl-3 lg:pl-0">
        Settings
      </h1>
      <ImageChange />
      <hr className="w-full lg:w-3/4 h-[1px] bg-black" />
      <NameForm />
    </div>
  );
};
export default Config;
