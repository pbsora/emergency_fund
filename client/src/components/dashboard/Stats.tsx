import { Status } from "@/lib/Types & Interfaces";
import API from "@/utils/api";

import { FaArrowTrendUp } from "react-icons/fa6";
import { DateTime } from "ts-luxon";

const wait = async (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

const Stats = async () => {
  await wait(5000);
  let stats: Status = await API.get(
    "transactions/status"
  ).then((res) => res.json());

  if (!stats.count) {
    stats = {
      total: 0,
      count: 0,
      last: {
        amount: 0,
        date: new Date(),
        description: "",
        transactionId: "",
      },
    };
  }

  return (
    <div className="bg-gradient-to-b from-slate-100 to-white from-80% lg:from-100%  lg:bg-slate-100  dark:bg-slate-900 md:w-[35%] h-screen container">
      <h1 className="font-semibold text-2xl my-10">
        Overview
      </h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col pb-4 border-b">
          <h2 className="text-sm font-light text-zinc-500">
            Total Savings
          </h2>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold">
              ${stats.total}
            </span>
            <div className="bg-green-200 rounded-sm text-green-600 text-sm py-1 px-2 flex items-center gap-2">
              <FaArrowTrendUp />
              <span>20%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col pb-4 border-b">
          <h2 className="text-sm font-light text-zinc-500">
            Count
          </h2>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold">
              {stats.count}
            </span>
            <div className="bg-green-200 rounded-sm text-green-600 text-sm py-1 px-2 flex items-center gap-2">
              <FaArrowTrendUp />
              <span>20%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-light text-zinc-500">
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
            <div className="bg-green-200 rounded-sm text-green-600 text-sm py-1 px-2 flex items-center gap-2">
              <FaArrowTrendUp />
              <span>20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function StatsSkeleton() {
  return (
    <div className="bg-gradient-to-b from-slate-100 to-white from-80% lg:from-100%  lg:bg-slate-100  dark:bg-slate-900 md:w-[35%] h-screen container">
      <h1 className="font-semibold text-2xl my-10">
        Overview
      </h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col pb-4 border-b">
          <h2 className="text-sm font-light text-zinc-500">
            Total Savings
          </h2>
          <div className="flex items-end justify-between">
            <span className=" bg-zinc-200/90 h-7 rounded-xl animate-pulse w-40"></span>
            <div className="bg-green-200 rounded-sm text-green-600 text-sm py-1 px-2 flex items-center gap-2">
              <FaArrowTrendUp />
              <span>20%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col pb-4 border-b">
          <h2 className="text-sm font-light text-zinc-500">
            Count
          </h2>
          <div className="flex items-end justify-between">
            <span className=" bg-zinc-200/90 h-7 rounded-xl animate-pulse w-40"></span>
            <div className="bg-green-200 rounded-sm text-green-600 text-sm py-1 px-2 flex items-center gap-2">
              <FaArrowTrendUp />
              <span>20%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-light text-zinc-500">
            Last
          </h2>
          <div className="flex items-end justify-between">
            <span className=" bg-zinc-200/90 h-7 rounded-xl animate-pulse w-40"></span>
            <div className="bg-green-200 rounded-sm text-green-600 text-sm py-1 px-2 flex items-center gap-2">
              <FaArrowTrendUp />
              <span>20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
