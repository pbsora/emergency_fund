import { Suspense } from "react";
import TopBar from "../TopBar";
import RecentTransactions, {
  RecentTransactionsSkeleton,
} from "./RecentTransactions";
import ThisYear from "./ThisYear";

const Recent = async () => {
  return (
    <div className="max-h-screen md:w-[65%] flex flex-col container dark:bg-zinc-950/50">
      <TopBar />
      <ThisYear />
      <Suspense fallback={<RecentTransactionsSkeleton />}>
        <RecentTransactions />
      </Suspense>
    </div>
  );
};
export default Recent;
