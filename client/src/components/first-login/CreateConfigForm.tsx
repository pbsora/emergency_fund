"use client";

import { newConfigAction } from "@/actions/configActions";
import { formatCurrency } from "@/utils/formatters";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Oval } from "react-loader-spinner";

const CreateConfigForm = ({
  userId,
}: {
  userId: string;
}) => {
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [expenses, setExpenses] = useState(
    formatCurrency(0)
  );

  const [result, action] = useFormState(
    newConfigAction.bind(
      null,
      selectedMonth.toString(),
      expenses,
      userId
    ),
    null
  );

  return (
    <div className="container flex justify-center items-center w-screen h-screen">
      <div className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl text-center font-semibold">
            Welcome!
          </h1>
          <h2 className="text-lg text-balance text-center">
            Please answer a few questions to help you figure
            out how much you need to save.
          </h2>
        </div>
        <form
          action={action}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-lg text-center">
              Your monthly expenses
            </h2>
            <div>
              <Input
                type="text"
                name="monthlyExpenses"
                value={expenses}
                onChange={(e) =>
                  setExpenses(
                    formatCurrency(e.target.value)
                  )
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="font-semibold text-lg text-balance text-center">
              How many months of expenses do you want to
              save?
            </h2>
            <div className="flex justify-around items-center ">
              <Button
                type="button"
                className="py-1 px-2"
                variant={
                  selectedMonth === 3
                    ? "default"
                    : "outline"
                }
                onClick={() => setSelectedMonth(3)}
              >
                3 months
              </Button>
              <Button
                type="button"
                className="py-1 px-2"
                variant={
                  selectedMonth === 6
                    ? "default"
                    : "outline"
                }
                onClick={() => setSelectedMonth(6)}
              >
                6 months
              </Button>
              <Button
                type="button"
                className="py-1 px-2"
                variant={
                  selectedMonth === 12
                    ? "default"
                    : "outline"
                }
                onClick={() => setSelectedMonth(12)}
              >
                12 months
              </Button>
            </div>
            <div className="mt-8">
              <p className="text-balance text-center">
                You will need to save{" "}
                {formatCurrency(
                  +expenses.replace(/[$,]/g, "") *
                    selectedMonth
                )}{" "}
                in total.
              </p>
            </div>
            {result && (
              <p className="text-red-500 text-sm text-center">
                {result?.message}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};
export default CreateConfigForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending ? (
        <Oval color="#fff" height={20} width={20} />
      ) : (
        "Create"
      )}
    </Button>
  );
};
