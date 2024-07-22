import ImageChange from "@/components/config/ImageChange";
import MonthsChange from "@/components/config/MonthsChange";
import NameForm from "@/components/config/NameForm";
import RefreshToken from "@/components/config/RefreshToken";
import { UserConfig } from "@/lib/Types & Interfaces";
import API from "@/utils/api";

const Config = async () => {
  const userConfig: UserConfig = await API.get(
    "config"
  ).then((res) => res.json());

  return (
    <div className="flex flex-col gap-10 w-full px-3 md:ml-10 pt-10 h-fit lg:h-[100dvh] overflow-y-scroll">
      <h1 className="text-3xl font-semibold pl-3 lg:pl-0">
        Settings
      </h1>
      <ImageChange />
      <hr className="w-full lg:w-3/4 bg-black" />
      <NameForm />
      <hr className="w-full lg:w-3/4 bg-black" />
      <MonthsChange config={userConfig} />
    </div>
  );
};
export default Config;
