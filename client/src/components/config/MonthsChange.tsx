"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { monthsAction } from "@/actions/configActions";
import { useState } from "react";

const MonthsChange = ({ months }: { months: number }) => {
  const [result, action] = useFormState(monthsAction, null);
  const [selectedMonth, setSelectedMonth] =
    useState(months);

  return (
    <form
      action={() => action(selectedMonth)}
      className="flex flex-col gap-5 md:h-auto w-full sm:w-3/4 m-auto md:m-0 lg:w-2/4 xl:w-[35%] mb-10"
    >
      <h2 className="font-semibold text-lg text-center">
        How many months do you want to save?
      </h2>
      <div className="flex gap-1 items-center justify-center">
        <Button
          type="button"
          className="py-1 px-2"
          variant={
            selectedMonth === 3 ? "default" : "outline"
          }
          onClick={() => setSelectedMonth(3)}
        >
          3 months
        </Button>
        <Button
          type="button"
          className="py-1 px-2"
          variant={
            selectedMonth === 6 ? "default" : "outline"
          }
          onClick={() => setSelectedMonth(6)}
        >
          6 months
        </Button>
        <Button
          type="button"
          className="py-1 px-2"
          variant={
            selectedMonth === 12 ? "default" : "outline"
          }
          onClick={() => setSelectedMonth(12)}
        >
          12 months
        </Button>
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
  );
};
export default MonthsChange;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending ? "Changing" : "Update"}
    </Button>
  );
};
