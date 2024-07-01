import Recent from "@/components/dashboard/Recent/Recent";
import Overview, {
  OverviewSkeleton,
} from "@/components/dashboard/Overview";
import { Suspense } from "react";

const Dashboard = async () => {
  return (
    <div className="flex flex-col md:flex-row w-full text-zinc-800 dark:text-white max-h-[100dvh] ">
      <Suspense fallback={<OverviewSkeleton />}>
        <Overview />
      </Suspense>
      <Recent />
    </div>
  );
};
export default Dashboard;
