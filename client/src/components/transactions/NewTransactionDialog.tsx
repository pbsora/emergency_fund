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
import { format } from "date-fns";
import { useFormState, useFormStatus } from "react-dom";
import { newTransactionAction } from "@/actions/transactionActions";

const NewTransactionDialog = () => {
  const [Mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [result, action] = useFormState(
    newTransactionAction,
    null
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!Mounted) {
    return;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border rounded-md hover:bg-zinc-300 flex py-2 px-2 dark:bg-zinc-200 dark:hover:bg-zinc-400 duration-200 text-zinc-900">
          <Plus className="text-green-500 mr-2 dark:" />
          Add Transaction
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
              type="number"
              name="amount"
              placeholder="$1234.6789"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Description</Label>
            <textarea
              rows={3}
              className="w-full p-2 border border-zinc-200 rounded-md resize-none"
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
            <input
              type="text"
              name="date"
              value={date?.toISOString()}
              hidden
            />
          </div>
          {result && (
            <div className="text-red-500 text-sm w-full text-center ">
              {result.message}
            </div>
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