import TopBar from "../TopBar";
import RecentTransactions, {
  RecentTransactionsSkeleton,
} from "./RecentTransactions";
import ThisYear from "./ThisYear";
import API from "@/utils/api";
import { Transaction } from "@/lib/Types & Interfaces";
import { DateTime } from "ts-luxon";

const Recent = async () => {
  const recentTransactions: Transaction[] = await API.get(
    "transactions"
  ).then((res) => res.json());

  const formattedTransactions = recentTransactions
    .map((transaction) => ({
      ...transaction,
      date: DateTime.fromISO(
        transaction.date.toString()
      ).toFormat("LLL"),
    }))
    .reduce<{ [key: string]: number }>(
      (acc, transaction) => {
        acc[transaction.date] = acc[transaction.date]
          ? acc[transaction.date] + transaction.amount
          : transaction.amount;

        return acc;
      },
      {}
    );

  const lastThree = recentTransactions.slice(0, 3);

  return (
    <div className="max-h-screen md:w-[65%] flex flex-col container dark:bg-zinc-950/50 h-screen">
      <TopBar />
      <ThisYear transactions={formattedTransactions} />
      <RecentTransactions recentTransactions={lastThree} />
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
