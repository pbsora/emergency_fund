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
import { Plus } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

const RecentTransactions = async ({
  recentTransactions,
}: {
  recentTransactions?: Transaction[];
}) => {
  return (
    <div className="lg:max-h-[40%] lg:mt-0">
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
        {recentTransactions?.length ? (
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
          <div className="w-full h-full flex items-center justify-center">
            <Link
              href={"/transactions"}
              className="flex items-center justify-center gap-3 border border-zinc-300 rounded-md p-2 cursor-pointer hover:bg-zinc-100 duration-200"
            >
              <Plus className="text-green-500" />
              <span>New transaction</span>
            </Link>
          </div>
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
