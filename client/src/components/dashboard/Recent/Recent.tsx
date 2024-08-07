import TopBar from "../TopBar";
import RecentTransactions, {
  RecentTransactionsSkeleton,
} from "./RecentTransactions";
import ThisYear, { ThisYearSkeleton } from "./ThisYear";
import API from "@/utils/api";
import { Transaction } from "@/lib/Types & Interfaces";

const Recent = async () => {
  let recentTransactions: Transaction[] = await API.get(
    "transactions?Criteria=newest"
  ).then((res) => res.json());

  recentTransactions = Array.isArray(recentTransactions)
    ? recentTransactions
    : [];

  const lastThree = recentTransactions.slice(0, 3);

  return (
    <div className="max-h-screen md:w-[65%] flex flex-col gap-5 justify-between lg:justify-normal lg:gap-0 dark:bg-zinc-950/50 h-screen overflow-hidden">
      <TopBar />
      <ThisYear transactions={recentTransactions} />
      <RecentTransactions recentTransactions={lastThree} />
    </div>
  );
};
export default Recent;

export const RecentSkeleton = () => {
  return (
    <div className="max-h-screen md:w-[65%] flex flex-col  justify-between lg:justify-normal lg:gap-0 dark:bg-zinc-950/50 h-screen overflow-hidden">
      <TopBar />
      <ThisYearSkeleton />
      <RecentTransactionsSkeleton />
    </div>
  );
};
