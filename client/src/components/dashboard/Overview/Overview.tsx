import { Status } from "@/lib/Types & Interfaces";
import API from "@/utils/api";
import { formatCurrency } from "@/utils/formatters";
import "react-circular-progressbar/dist/styles.css";

import { FaArrowTrendUp } from "react-icons/fa6";
import { DateTime } from "ts-luxon";
import OverviewProgressBar from "./OverviewProgressBar";
import { Parse } from "@/lib/helpers";

const wait = async (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

const defaultStats = {
  total: 0,
  count: 0,
  last: {
    amount: 0,
    date: new Date(),
    description: "",
    transactionId: "",
  },
  months: 0,
  monthlyExpenses: 0,
} as const;

const Overview = async () => {
  await wait(1000);
  let stats: Status = await API.get(
    "transactions/status"
  ).then((res) => Parse(res));

  if (!stats.count) {
    stats = defaultStats;
  }

  const percentage =
    Number.parseFloat(
      (
        (stats.total /
          (stats.monthlyExpenses * stats.months)) *
        100
      ).toFixed(1)
    ) || 0;

  return (
    <div className=" bg-zinc-50 dark:bg-zinc-950/50 md:dark:bg-[#1F1F1F] md:w-[35%] h-screen container flex flex-col">
      <h1 className="font-semibold text-2xl my-10">
        Overview
      </h1>
      <div className="flex flex-col gap-8 flex-1">
        <div className="flex flex-col pb-4 border-b dark:border-zinc-400">
          <h2 className="text-sm font-light text-zinc-500 mb-1">
            Total Savings
          </h2>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold">
              {formatCurrency(stats.total)}
            </span>
          </div>
        </div>
        <div className="flex flex-col pb-4 border-b dark:border-zinc-400">
          <h2 className="text-sm font-light text-zinc-500 mb-1">
            Count
          </h2>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold">
              {stats.count}
            </span>
          </div>
        </div>
        <div className="flex flex-col ">
          <h2 className="text-sm font-light text-zinc-500 mb-1">
            Last
          </h2>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold">
              {stats.count > 0
                ? DateTime.fromJSDate(
                    typeof stats.last.date === "string"
                      ? new Date(stats.last.date)
                      : stats.last.date
                  ).toFormat("MM/dd")
                : "N/A"}
            </span>
          </div>
        </div>
        <OverviewProgressBar value={percentage} />
      </div>
    </div>
  );
};

export function OverviewSkeleton() {
  return (
    <div className=" bg-zinc-50 dark:bg-zinc-950/50 md:dark:bg-[#1F1F1F]   md:w-[35%] h-screen container flex flex-col">
      <h1 className="font-semibold text-2xl my-5 lg:my-10">
        Overview
      </h1>
      <div className="flex flex-col gap-8 flex-1">
        <div className="flex flex-col pb-4 border-b dark:border-zinc-400">
          <h2 className="text-sm font-light text-zinc-500  mb-1">
            Total Savings
          </h2>
          <div className="flex items-end justify-between">
            <span className=" bg-zinc-200/90 h-7 rounded-xl animate-pulse w-40"></span>
          </div>
        </div>
        <div className="flex flex-col pb-4 border-b">
          <h2 className="text-sm font-light text-zinc-500 mb-1">
            Count
          </h2>
          <div className="flex items-end justify-between">
            <span className=" bg-zinc-200/90 h-7 rounded-xl animate-pulse w-40"></span>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-light text-zinc-500  mb-1">
            Last
          </h2>
          <div className="flex items-end justify-between">
            <span className=" bg-zinc-200/90 h-7 rounded-xl animate-pulse w-40"></span>
          </div>
        </div>
        <OverviewProgressBar value={0} />
      </div>
    </div>
  );
}

export default Overview;
