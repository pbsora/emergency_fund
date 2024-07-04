import {
  Transaction,
  User,
} from "@/lib/Types & Interfaces";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Capitalize } from "@/lib/helpers";
import { DateTime } from "ts-luxon";
import { formatCurrency } from "@/utils/formatters";
import TransactionDetailsDialog from "./TransactionDetailsDialog";

type Props = {
  transaction: Transaction;
  user: User;
};

const SingleTransaction = ({
  transaction,
  user,
}: Props) => {
  return (
    <div className="py-2 flex items-center w-full">
      <div className="flex items-center gap-5 w-1/4">
        <Avatar className="size-8">
          <AvatarImage
            src={user.profilePicture}
            alt={user.name}
            className="object-cover"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h3 className="text-sm hidden md:block">
          {Capitalize(user.name)}
        </h3>
      </div>
      <div className="w-1/4 text-center text-sm">
        {DateTime.fromJSDate(
          typeof transaction.date === "string"
            ? new Date(transaction.date)
            : transaction.date
        ).toFormat("MM/dd")}
      </div>
      <div className="w-1/4 text-end">
        {formatCurrency(transaction.amount)}
      </div>
      <div className="w-1/4 text-end">
        <TransactionDetailsDialog
          transaction={transaction}
        />
      </div>
    </div>
  );
};
export default SingleTransaction;
