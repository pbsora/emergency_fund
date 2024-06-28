import Stats from "@/components/dashboard/Stats";
import TopBar from "@/components/dashboard/TopBar";

const Dashboard = async () => {
  return (
    <div className="flex flex-col md:flex-row w-full text-zinc-800 dark:text-white">
      <Stats />
      <div className="h-screen md:w-[65%]">
        <TopBar />
      </div>
    </div>
  );
};
export default Dashboard;
