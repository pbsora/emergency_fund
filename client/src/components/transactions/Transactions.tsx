"use client";

import { Transaction } from "@/lib/Types & Interfaces";
import SingleTransaction from "./SingleTransaction";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { Fragment } from "react";

type TransactionsProps = {
  transactions: Transaction[] | undefined;
};

const Transactions = ({
  transactions,
}: TransactionsProps) => {
  const user = useAppSelector((state) => state.user.value);

  if (!transactions)
    return <div className=" w-full h-full">Loading...</div>;

  return (
    <div className="mt-5 flex flex-col">
      <div className="flex justify-between">
        <span className="text-zinc-400 text-sm flex-1">
          User
        </span>

        <span className="text-zinc-400 text-sm flex-1 text-center">
          Date
        </span>

        <span className="text-zinc-400 text-sm flex-1 text-end">
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
  );
};
export default Transactions;
