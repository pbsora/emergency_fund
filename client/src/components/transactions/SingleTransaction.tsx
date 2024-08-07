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
import { motion } from "framer-motion";

type Props = {
  transaction: Transaction;
  user: User;
  i: number;
  refetch: () => void;
};

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

const SingleTransaction = ({
  transaction,
  user,
  i,
  refetch,
}: Props) => {
  return (
    <motion.div
      className={`py-4 lg:py-2 2xl:py-5 flex items-center w-full `}
      variants={fadeInAnimationVariants}
      initial="initial"
      animate="animate"
      viewport={{ once: true }}
      custom={i}
    >
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
        ).toFormat("MM/dd/yy")}
      </div>
      <div className="w-1/4 text-end">
        {formatCurrency(transaction.amount)}
      </div>
      <div className="w-1/4 text-end">
        <TransactionDetailsDialog
          transaction={transaction}
          refetch={refetch as () => void}
        />
      </div>
    </motion.div>
  );
};
export default SingleTransaction;

export const SingleTransactionSkeleton = () => {
  return (
    <div className="py-3 flex items-center w-full animate-stagger600">
      <div className="flex items-center gap-5 w-1/4">
        <Avatar className="size-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="text-sm hidden md:block  w-32 h-6 bg-zinc-200 rounded-full animate-pulse"></span>
      </div>
      <div className="w-1/4 text-center text-sm ">
        <div className="w-32 h-6 bg-zinc-200 rounded-full animate-pulse m-auto"></div>
      </div>
      <div className="w-1/4 text-end">
        <div className=" w-20 h-6 bg-zinc-200 rounded-full animate-pulse ml-auto"></div>
      </div>
      <div className="w-1/4 text-end">
        <div className=" w-32 h-6 bg-zinc-200 rounded-full animate-pulse ml-auto"></div>
      </div>
    </div>
  );
};
