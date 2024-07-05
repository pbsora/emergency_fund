"use client";

import SingleTransaction, {
  SingleTransactionSkeleton,
} from "./SingleTransaction";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/actions/transactionActions";
import { Button } from "../ui/button";
import { IoMdArrowDropright } from "react-icons/io";
import NewTransactionDialog from "./NewTransactionDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");
  const user = useAppSelector((state) => state.user.value);

  const { data } = useQuery({
    queryKey: ["transactions", page, filter],
    queryFn: async () =>
      await fetchTransactions(page, filter),
  });

  let pagination, transactions;

  if (data) {
    pagination = data.pagination;
    transactions = data.transactions || [];
  }

  if (!transactions) return <TransactionsSkeleton />;

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-200">
          Transactions
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Button
              variant={"outline"}
              className="text-3xl px-2 rotate-180 dark:bg-zinc-200 text-zinc-900 hover:text-zinc-900 dark:hover:bg-zinc-300 duration-200"
              disabled={page <= 1}
              onClick={() =>
                setPage((prev) =>
                  prev <= 1 ? prev : prev - 1
                )
              }
            >
              <IoMdArrowDropright />
            </Button>
            <Button
              variant={"outline"}
              className="text-3xl px-2 dark:bg-zinc-200 text-zinc-900 hover:text-zinc-900 dark:hover:bg-zinc-300 duration-200"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!pagination?.HasNextPage}
            >
              <IoMdArrowDropright />
            </Button>
          </div>
          <NewTransactionDialog />
        </div>
      </div>
      <hr className="border-b border-zinc-200 mt-4" />
      <div className="w-full mt-3">
        <Select onValueChange={(e) => setFilter(e)}>
          <SelectTrigger className="w-[180px] ml-auto">
            <SelectValue
              placeholder="Filter by date"
              defaultValue={filter}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex justify-between">
          <span className="text-zinc-400 text-sm flex-1">
            User
          </span>

          <span className="text-zinc-400 text-sm flex-1 text-center">
            Date
          </span>

          <span className="text-zinc-400 text-sm flex-1 text-end pr-3">
            Amount
          </span>

          <span className="text-zinc-400 text-sm flex-1 text-end">
            Details
          </span>
        </div>
        <div className="flex-1 w-full mb-2 flex flex-col gap-3 divide-y-2 divide-zinc-300 mt-5">
          {transactions.length > 0 &&
            transactions?.map((transaction) => (
              <Fragment key={transaction.transactionId}>
                <SingleTransaction
                  transaction={transaction}
                  user={user}
                />
              </Fragment>
            ))}
        </div>
      </div>
    </>
  );
};
export default Transactions;

const TransactionsSkeleton = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-200">
          Transactions
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Button
              variant={"outline"}
              className="text-3xl px-2 rotate-180 dark:bg-zinc-200 text-zinc-900 hover:text-zinc-900 dark:hover:bg-zinc-300 duration-200"
              disabled
            >
              <IoMdArrowDropright />
            </Button>
            <Button
              variant={"outline"}
              className="text-3xl px-2 dark:bg-zinc-200 text-zinc-900 hover:text-zinc-900 dark:hover:bg-zinc-300 duration-200"
              disabled
            >
              <IoMdArrowDropright />
            </Button>
          </div>
          <NewTransactionDialog />
        </div>
      </div>
      <hr className="border-b border-zinc-200 mt-4" />
      <div className="w-full mt-3">
        <Select>
          <SelectTrigger className="w-[180px] ml-auto">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex justify-between">
          <span className="text-zinc-400 text-sm flex-1">
            User
          </span>

          <span className="text-zinc-400 text-sm flex-1 text-center">
            Date
          </span>

          <span className="text-zinc-400 text-sm flex-1 text-end pr-6">
            Amount
          </span>

          <span className="text-zinc-400 text-sm flex-1 text-end">
            Details
          </span>
        </div>
        <div className="flex-1 w-full mb-2 flex flex-col gap-3 divide-y-2 divide-zinc-300 mt-5">
          {new Array(6).fill("").map((_, i) => (
            <Fragment key={i}>
              <SingleTransactionSkeleton />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
