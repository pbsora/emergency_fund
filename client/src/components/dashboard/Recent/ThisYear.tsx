"use client";
import { Transaction } from "@/lib/Types & Interfaces";
import { BarChart } from "@mui/x-charts/BarChart";
import { useMemo } from "react";
import { DateTime } from "ts-luxon";

type ThisYearProps = {
  transactions: Transaction[];
};

const ThisYear = ({ transactions }: ThisYearProps) => {
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        DateTime.now().minus({ months: i }).toFormat("LLL")
      ).reverse(),
    []
  );

  const formattedTransactions = useMemo(() => {
    return transactions
      .map((transaction) => ({
        ...transaction,
        date: DateTime.fromISO(
          transaction.date.toString()
        ).toFormat("LLL"),
      }))
      .reduce<{ [key: string]: number }>(
        (acc, transaction) => {
          acc[transaction.date] = acc[transaction.date]
            ? acc[transaction.date] + transaction.amount
            : transaction.amount;

          return acc;
        },
        {}
      );
  }, [transactions]);

  const data = new Map(
    Object.entries(formattedTransactions)
  );

  const series = useMemo(
    () => months.map((month) => data.get(month) || 0),
    [data]
  );

  return (
    <div className="h-[50%] w-full">
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: months,
          },
        ]}
        series={[{ data: series }]}
        colors={["#FFC107"]}
        className="w-full"
      />
    </div>
  );
};
export default ThisYear;
