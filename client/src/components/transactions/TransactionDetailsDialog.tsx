"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CgDetailsMore } from "react-icons/cg";
import { Transaction } from "@/lib/Types & Interfaces";
import { useState, useTransition } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useRouter } from "next/navigation";
import { deleteTransactionAction } from "@/actions/transactionActions";

type Props = {
  transaction: Transaction;
};

const TransactionDetailsDialog = ({
  transaction,
}: Props) => {
  const [date, setDate] = useState<Date>(
    typeof transaction.date === "string"
      ? new Date(transaction.date)
      : transaction.date
  );
  const [edit, setEdit] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>
          <CgDetailsMore />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-lg">
            Transaction details
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Amount</Label>
            <Input
              value={transaction.amount}
              disabled={!edit}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Description</Label>
            <textarea
              rows={3}
              className="w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-md resize-none dark:bg-background"
              placeholder="What is this transaction for?"
              name="description"
              value={transaction.description}
              disabled={!edit}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(day: Date | undefined) =>
                    setDate(day!)
                  }
                  initialFocus
                  disabled={!edit}
                />
              </PopoverContent>
            </Popover>
            <input
              type="text"
              name="date"
              value={date?.toISOString()}
              hidden
            />
          </div>
          <div className="flex gap-3 w-full">
            {edit ? (
              <Button
                variant={"outline"}
                className="w-full"
              >
                Update
              </Button>
            ) : (
              <DeleteTransactionButton
                id={transaction.transactionId}
              />
            )}
            <Button
              variant={"default"}
              className="w-full"
              onClick={() => setEdit((prev) => !prev)}
            >
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default TransactionDetailsDialog;

const DeleteTransactionButton = ({
  id,
}: {
  id: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      variant={"destructive"}
      className="w-full"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteTransactionAction(id);
          router.refresh();
        })
      }
    >
      Delete
    </Button>
  );
};
