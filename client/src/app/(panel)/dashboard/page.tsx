import Stats, {
  StatsSkeleton,
} from "@/components/dashboard/Stats";
import TopBar from "@/components/dashboard/TopBar";
import { Suspense } from "react";

const Dashboard = async () => {
  return (
    <div className="flex flex-col md:flex-row w-full text-zinc-800 dark:text-white">
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
      <div className="h-screen md:w-[65%]">
        <TopBar />
      </div>
    </div>
  );
};
export default Dashboard;
