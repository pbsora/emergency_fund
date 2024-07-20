import CreateConfigForm from "@/components/first-login/CreateConfigForm";
import { Parse } from "@/lib/helpers";
import { User } from "@/lib/Types & Interfaces";
import API from "@/utils/api";

const FirstLoginPage = async () => {
  const { userId }: User = await API.get("/auth/info").then(
    (res) => Parse(res)
  );

  return <CreateConfigForm userId={userId} />;
};
export default FirstLoginPage;
