"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format, set } from "date-fns";
import { useFormState, useFormStatus } from "react-dom";
import { newTransactionAction } from "@/actions/transactionActions";
import { formatCurrency } from "@/utils/formatters";

type Props = {
  refetch?: () => void;
};

const NewTransactionDialog = ({ refetch }: Props) => {
  const [Mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [result, action] = useFormState(
    newTransactionAction.bind(null, date?.toISOString()),
    null
  );

  const [amount, setAmount] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (result?.success) {
      refetch?.();
    }
  }, [result]);

  if (!Mounted) {
    return (
      <div className="w-full md:w-2/4 self-end mt-2">
        <div className="md:w-2/4 lg:w-4/12 justify-center flex border rounded-md hover:bg-zinc-300 py-2 px-2  dark:hover:bg-zinc-400 duration-200 ml-auto">
          <Plus className="text-green-500 dark:text-green-400 mr-2" />
          <span>Add transaction</span>
        </div>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full md:w-2/4 self-end mt-2">
        <div className="md:w-2/4 lg:w-4/12 justify-center flex border rounded-md hover:bg-zinc-300 py-2 px-2  dark:hover:bg-zinc-400 duration-200 ml-auto">
          <Plus className="text-green-500 mr-2 dark:text-green-400" />
          <span>Add transaction</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-lg">
            Create new transaction
          </DialogTitle>
        </DialogHeader>
        <form
          action={action}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-3">
            <Label htmlFor="amount" className="">
              How much?
            </Label>
            <Input
              type="text"
              name="amount"
              inputMode="numeric"
              placeholder="$"
              value={amount}
              onChange={(e) =>
                setAmount(formatCurrency(e.target.value))
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Description</Label>
            <textarea
              rows={3}
              className="w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-md resize-none dark:bg-background"
              placeholder="What is this transaction for?"
              name="description"
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
                  onSelect={setDate}
                  initialFocus
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
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default NewTransactionDialog;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading" : "Create"}
    </Button>
  );
};
