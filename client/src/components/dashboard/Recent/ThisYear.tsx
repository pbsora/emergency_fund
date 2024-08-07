"use client";

import { Transaction } from "@/lib/Types & Interfaces";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { Oval } from "react-loader-spinner";
import { DateTime } from "ts-luxon";

type ThisYearProps = {
  transactions: Transaction[];
};

const ThisYear = ({ transactions }: ThisYearProps) => {
  const { theme } = useTheme();

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
      <h2 className="text-2xl lg:ml-10 font-bold text-zinc-800 dark:text-zinc-200 pt-2 lg:mt-2 lg:hidden pl-6">
        Last 12 months
      </h2>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: months,
          },
        ]}
        sx={{
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":
            {
              strokeWidth: "0.4",
              fill: theme === "light" ? "#000" : "#fff",
            },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":
            {
              fill: theme === "light" ? "#000" : "#fff",
            },
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: theme === "light" ? "#000" : "#fff",
          },

          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: theme === "light" ? "#000" : "#fff",
          },
        }}
        series={[{ data: series }]}
        colors={["#FFC107"]}
        slotProps={{
          loadingOverlay: { message: "Loading..." },
        }}
      />
    </div>
  );
};
export default ThisYear;

export const ThisYearSkeleton = () => {
  return (
    <div className="h-[50%] w-full">
      <h2 className="text-2xl lg:ml-10 font-bold text-zinc-800 mt-10 lg:mt-2 lg:hidden pl-6">
        Last 12 months
      </h2>
      <div className="flex items-center justify-center h-full">
        <Oval
          color="#FFC107"
          height={50}
          width={50}
          secondaryColor="#94a3b8"
        />
      </div>
    </div>
  );
};
