import Recent from "@/components/dashboard/Recent/Recent";
import Stats, {
  StatsSkeleton,
} from "@/components/dashboard/Stats";
import { Suspense } from "react";

const Dashboard = async () => {
  return (
    <div className="flex flex-col md:flex-row w-full text-zinc-800 dark:text-white max-h-[100dvh] overflow-hidden">
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
      <Recent />
    </div>
  );
};
export default Dashboard;
