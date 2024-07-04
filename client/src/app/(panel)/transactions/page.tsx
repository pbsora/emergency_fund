"use client";

import TopBar from "@/components/dashboard/TopBar";
import NewTransactionDialog from "@/components/transactions/NewTransactionDialog";
import { Button } from "@/components/ui/button";
import { IoMdArrowDropright } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchTransactions } from "@/actions/transactionActions";
import Transactions from "@/components/transactions/Transactions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionsPage = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const { data } = useQuery({
    queryKey: ["transactions", page],
    queryFn: async () => await fetchTransactions(page),
  });

  console.log(filter);

  let pagination, transactions;

  if (data) {
    pagination = data.pagination;
    transactions = data.transactions || [];
  }

  return (
    <main className="flex flex-col w-full h-screen container">
      <div className="self-end">
        <TopBar />
      </div>
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
        <Select>
          <SelectTrigger className="w-[180px] ml-auto">
            <SelectValue
              placeholder="Last month"
              defaultValue={filter}
            />
          </SelectTrigger>
          <SelectContent
            onChange={(e) => console.log(e.target)}
          >
            <SelectItem
              value="newest"
              onClick={() => setFilter("newest")}
            >
              Newest
            </SelectItem>
            <SelectItem
              value="oldest"
              onClick={() => setFilter("oldest")}
            >
              Oldest
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Transactions transactions={transactions} />
    </main>
  );
};
export default TransactionsPage;
