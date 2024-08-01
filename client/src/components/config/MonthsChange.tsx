"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { monthsAction } from "@/actions/configActions";
import { useState } from "react";
import { Input } from "../ui/input";
import { formatCurrency } from "@/utils/formatters";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { UserConfig } from "@/lib/Types & Interfaces";
import { Oval } from "react-loader-spinner";

type Props = {
  config: UserConfig;
};

const MonthsChange = ({ config }: Props) => {
  const { userId } = useAppSelector(
    (state) => state.user.value
  );

  const { months, monthlyExpenses } = config;

  const [selectedMonth, setSelectedMonth] =
    useState(months);

  const [result, action] = useFormState(
    monthsAction.bind(
      null,
      userId,
      config.id,
      selectedMonth
    ),
    null
  );

  return (
    <form
      action={action}
      className="flex flex-col gap-5 md:h-auto w-full sm:w-3/4 m-auto md:m-0 lg:w-2/4 xl:w-[35%] pb-10 lg:pb-20"
    >
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">
          Your monthly expenses
        </h2>
        <div>
          <Input
            type="text"
            defaultValue={formatCurrency(monthlyExpenses)}
            name="monthlyExpenses"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-semibold text-lg ">
          How many months of expenses do you want to save?
        </h2>
        <div className="flex justify-around items-center ">
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
      </div>
      <SubmitButton />
    </form>
  );
};
export default MonthsChange;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending ? (
        <Oval color="#fff" height={20} width={20} />
      ) : (
        "Update"
      )}
    </Button>
  );
};
