import { internalFetch } from "@/utils/api";
import ReduxTest from "./_components/ReduxTest";

const Dashboard = async () => {
  const res = await internalFetch
    .get("auth/info")
    .then((res) => res.json());
  console.log(res);

  return (
    <div className=" bg-zinc-900 min-h-screen">
      <ReduxTest user={res} />
    </div>
  );
};
export default Dashboard;
