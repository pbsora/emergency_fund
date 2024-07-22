import TopBar from "../TopBar";
import RecentTransactions, {
  RecentTransactionsSkeleton,
} from "./RecentTransactions";
import ThisYear from "./ThisYear";
import API from "@/utils/api";
import { Transaction } from "@/lib/Types & Interfaces";

const Recent = async () => {
  let recentTransactions: Transaction[] = await API.get(
    "transactions?Criteria=newest&Page=1&Limit=3"
  ).then((res) => res.json());

  recentTransactions = Array.isArray(recentTransactions)
    ? recentTransactions
    : [];

  return (
    <div className="max-h-screen md:w-[65%] flex flex-col container gap-20 lg:gap-0 dark:bg-zinc-950/50 h-screen">
      <TopBar />
      <ThisYear transactions={recentTransactions} />
      <RecentTransactions
        recentTransactions={recentTransactions}
      />
    </div>
  );
};
export default Recent;

export const RecentSkeleton = () => {
  return (
    <div className="max-h-screen md:w-[65%] flex flex-col container dark:bg-zinc-950/50 h-screen">
      <TopBar />
      <div className="h-[50%] w-full flex items-center justify-center">
        Loading
      </div>
      <RecentTransactionsSkeleton />
    </div>
  );
};
