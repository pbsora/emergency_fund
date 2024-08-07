import { Status } from "@/lib/Types & Interfaces";
import API from "@/utils/api";
import { formatCurrency } from "@/utils/formatters";
import "react-circular-progressbar/dist/styles.css";
import { DateTime } from "ts-luxon";
import OverviewProgressBar from "./OverviewProgressBar";
import { Parse } from "@/lib/helpers";

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

const wait = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

const Overview = async () => {
  await wait(2000);

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
    <div className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950/90 from-95% md:from-100% md:w-[35%] h-screen container flex flex-col">
      <h1 className="font-bold text-zinc-800 dark:text-zinc-200 text-2xl my-10">
        Overview
      </h1>
      <div className="flex flex-col gap-5 lg:gap-8 flex-1">
        <div className="flex flex-col pb-4 border-b dark:border-zinc-400">
          <h2 className="text-base lg:text-sm font-light text-zinc-500 dark:text-zinc-400 mb-1">
            Total Savings
          </h2>
          <div className="flex items-end justify-between">
            <span className="text-3xl lg:text-2xl 2xl:text-3xl font-semibold">
              {formatCurrency(stats.total)}
            </span>
          </div>
        </div>
        <div className="flex flex-col pb-4 border-b dark:border-zinc-400">
          <h2 className="text-base lg:text-sm font-light text-zinc-500 dark:text-zinc-400 mb-1">
            Times saved
          </h2>
          <div className="flex items-end justify-between">
            <span className="text-3xl lg:text-2xl 2xl:text-3xl font-semibold">
              {stats.count}
            </span>
          </div>
        </div>
        <div className="flex flex-col ">
          <h2 className="text-base lg:text-sm font-light text-zinc-500 dark:text-zinc-400 mb-1">
            Last
          </h2>
          <div className="flex items-end justify-between">
            <span className="text-3xl lg:text-2xl 2xl:text-3xl font-semibold">
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
    <div className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950/90 from-95% md:dark:bg-[#1F1F1F] md:w-[35%] h-screen container flex flex-col">
      <h1 className="font-semibold text-2xl my-10">
        Overview
      </h1>
      <div className="flex flex-col gap-8 flex-1">
        <div className="flex flex-col pb-4 border-b dark:border-zinc-400">
          <h2 className="text-base lg:text-sm font-light text-zinc-500 dark:text-zinc-400 mb-1">
            Total Savings
          </h2>
          <div className="flex items-end justify-between">
            <span className=" bg-zinc-200/90 h-8 rounded-xl animate-pulse w-40"></span>
          </div>
        </div>
        <div className="flex flex-col pb-4 border-b">
          <h2 className="text-base lg:text-sm font-light text-zinc-500 dark:text-zinc-400 mb-1">
            Times saved
          </h2>
          <div className="flex items-end justify-between">
            <span className=" bg-zinc-200/90 h-8 rounded-xl animate-pulse w-40"></span>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-base lg:text-sm font-light text-zinc-500 dark:text-zinc-400 mb-1">
            Last
          </h2>
          <div className="flex items-end justify-between">
            <span className=" bg-zinc-200/90 h-8 rounded-xl animate-pulse w-40"></span>
          </div>
        </div>
        <OverviewProgressBar value={0} />
      </div>
    </div>
  );
}

export default Overview;
