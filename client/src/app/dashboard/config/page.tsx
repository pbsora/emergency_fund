import ImageChange from "@/components/config/ImageChange";
import NameForm from "@/components/config/NameForm";

const Config = () => {
  return (
    <div className="flex flex-col gap-10">
      <ImageChange />
      <NameForm />
    </div>
  );
};
export default Config;
