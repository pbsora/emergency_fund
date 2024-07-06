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
import { useEffect, useState, useTransition } from "react";
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
import {
  deleteTransactionAction,
  updateTransactionAction,
} from "@/actions/transactionActions";
import { useFormState, useFormStatus } from "react-dom";
import { useAppSelector } from "@/hooks/ReduxHooks";

type Props = {
  transaction: Transaction;
  refetch: () => void;
};

const TransactionDetailsDialog = ({
  transaction,
  refetch,
}: Props) => {
  const { userId } = useAppSelector(
    (state) => state.user.value
  );

  const [date, setDate] = useState<Date>(
    typeof transaction.date === "string"
      ? new Date(transaction.date)
      : transaction.date
  );
  const [edit, setEdit] = useState(false);

  const [result, action] = useFormState(
    updateTransactionAction.bind(
      null,
      userId,
      transaction.transactionId,
      date?.toISOString()
    ),
    null
  );

  useEffect(() => {
    if (result && result.success) {
      refetch();
    }
  }, [result]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="py-2 px-3 border rounded-lg">
          <CgDetailsMore />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-lg">
            Transaction details
          </DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          action={action}
        >
          <div className="flex flex-col gap-2">
            <Label>Amount</Label>
            <Input
              type="number"
              name="amount"
              inputMode="numeric"
              placeholder="$1234.6789"
              pattern="[0-9]+"
              defaultValue={transaction.amount}
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
              defaultValue={transaction.description}
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
          </div>
          {result && result.success ? (
            <p className=" text-sm text-center">
              {result.success}
            </p>
          ) : (
            <p className="text-red-500 text-sm text-center">
              {result?.message}
            </p>
          )}
          <div className="flex gap-3 w-full">
            {edit ? (
              <UpdateButton />
            ) : (
              <DeleteTransactionButton
                id={transaction.transactionId}
                refetch={refetch}
              />
            )}
            <Button
              variant={"default"}
              className="w-full"
              type="button"
              onClick={() => setEdit((prev) => !prev)}
            >
              {edit ? "Cancel edit" : "Edit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default TransactionDetailsDialog;

const DeleteTransactionButton = ({
  id,
  refetch,
}: {
  id: string;
  refetch: () => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      variant={"destructive"}
      className="w-full"
      disabled={isPending}
      type="button"
      onClick={() =>
        startTransition(async () => {
          const res = (await deleteTransactionAction(
            id
          )) as unknown as { success: string };
          if (res && res.success) {
            refetch();
          }
        })
      }
    >
      Delete
    </Button>
  );
};

const UpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={"outline"}
      className="w-full"
      type="submit"
      disabled={pending}
    >
      {pending ? "Updating" : "Update"}
    </Button>
  );
};
