import SingleTransaction, {
  SingleTransactionSkeleton,
} from "@/components/transactions/SingleTransaction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction } from "@/lib/Types & Interfaces";
import API from "@/utils/api";
import { Fragment } from "react";

const wait = async (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

const RecentTransactions = async () => {
  await wait(1000);

  const recentTransactions = await API.get(
    "transactions?pagesize=3"
  ).then((res) => res.json());

  return (
    <div className="lg:max-h-[40%]">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">
          Recent Activity
        </h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Last month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Last 24h</SelectItem>
            <SelectItem value="dark">Last week</SelectItem>
            <SelectItem value="system">
              Last month
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-zinc-400 text-sm">User</span>
        <span className="text-zinc-400 text-sm">Date</span>
        <span className="text-zinc-400 text-sm">
          Amount
        </span>
      </div>
      <div className="flex flex-col mt-2 h-full gap-1 divide-y-2 divide-zinc-200/80">
        {recentTransactions ? (
          recentTransactions.map(
            (transaction: Transaction, i: number) => (
              <Fragment key={transaction.transactionId}>
                <SingleTransaction
                  transaction={transaction}
                />
              </Fragment>
            )
          )
        ) : (
          <div>No transactions yet</div>
        )}
      </div>
    </div>
  );
};
export default RecentTransactions;

export const RecentTransactionsSkeleton = () => {
  return (
    <div className="lg:max-h-[40%]">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">
          Recent Activity
        </h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Last month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Last 24h</SelectItem>
            <SelectItem value="dark">Last week</SelectItem>
            <SelectItem value="system">
              Last month
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-zinc-400 text-sm">User</span>
        <span className="text-zinc-400 text-sm">Date</span>
        <span className="text-zinc-400 text-sm">
          Amount
        </span>
      </div>
      <div className="flex flex-col mt-2 h-full gap-1 divide-y-2 divide-zinc-200/80">
        {new Array(3).fill("").map((_, i: number) => (
          <Fragment key={i}>
            <SingleTransactionSkeleton />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
