import ImageChange from "@/components/config/ImageChange";
import NameForm from "@/components/config/NameForm";

const Config = () => {
  return (
    <div className="flex flex-col gap-10 w-full border border-red-500">
      <ImageChange />
      <NameForm />
    </div>
  );
};
export default Config;
