import Overview, {
  OverviewSkeleton,
} from "@/components/dashboard/Overview/Overview";
import Recent, {
  RecentSkeleton,
} from "@/components/dashboard/Recent/Recent";

import { Suspense } from "react";

const Dashboard = async () => {
  return (
    <main className="flex flex-col md:flex-row w-full text-zinc-800 dark:text-white lg:max-h-[100dvh]">
      <Suspense fallback={<OverviewSkeleton />}>
        <Overview />
      </Suspense>
      <Suspense fallback={<RecentSkeleton />}>
        <Recent />
      </Suspense>
    </main>
  );
};
export default Dashboard;
