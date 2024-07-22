import CreateConfigForm from "@/components/first-login/CreateConfigForm";
import FirstLoginNavbar from "@/components/first-login/FirstLoginNavbar";
import { Parse } from "@/lib/helpers";
import { User } from "@/lib/Types & Interfaces";
import API from "@/utils/api";

const FirstLoginPage = async () => {
  const { userId }: User = await API.get("/auth/info").then(
    (res) => Parse(res)
  );

  return (
    <main className="w-screen h-screen dark:bg-zinc-900 dark:text-zinc-300">
      <FirstLoginNavbar />
      <CreateConfigForm userId={userId} />
    </main>
  );
};
export default FirstLoginPage;
