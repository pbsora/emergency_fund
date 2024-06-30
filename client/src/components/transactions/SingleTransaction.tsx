"use client";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { Transaction } from "@/lib/Types & Interfaces";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { DateTime } from "ts-luxon";
import { formatCurrency } from "@/utils/formatters";

const SingleTransaction = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const user = useAppSelector((state) => state.user.value);

  return (
    <div className="h-1/3 flex items-center  w-full">
      <div className="flex items-center gap-5 w-1/3">
        <Avatar className="size-8">
          <AvatarImage
            src={user.profilePicture}
            alt={user.name}
          />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm">{user.name}</span>
      </div>
      <div className="w-1/3 text-center text-sm">
        {DateTime.fromJSDate(
          typeof transaction.date === "string"
            ? new Date(transaction.date)
            : transaction.date
        ).toFormat("MM/dd")}
      </div>
      <div className="w-1/3 text-end">
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};
export default SingleTransaction;

export const SingleTransactionSkeleton = () => {
  return (
    <div className="h-1/3 flex items-center w-full">
      <div className="flex items-center gap-5 w-1/3">
        <Avatar className="size-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="text-sm w-32 h-6 bg-zinc-200 rounded-full animate-pulse"></span>
      </div>
      <div className="w-1/3 text-sm">
        <div className="w-20 h-6 bg-zinc-200 rounded-full m-auto"></div>
      </div>
      <div className="w-1/3 ">
        <div className="w-20 h-6 bg-zinc-200 rounded-full ml-auto"></div>
      </div>
    </div>
  );
};
