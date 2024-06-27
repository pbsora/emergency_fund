import { FaArrowTrendUp } from "react-icons/fa6";

const Stats = () => {
  return (
    <div className="bg-slate-100 md:w-[35%] h-screen px-10">
      <h1 className="font-semibold text-2xl my-10">
        Overview
      </h1>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <h2 className="text-sm font-light text-zinc-500">
            Total Savings
          </h2>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-semibold">$1,200</p>
            <div className="bg-green-200 rounded-sm text-green-600 text-sm py-1 px-2 flex items-center gap-2">
              <FaArrowTrendUp />
              <span>20%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-light text-zinc-500">
            Total Savings
          </h2>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-semibold">$1,200</p>
            <div className="bg-green-200 rounded-sm text-green-600 text-sm py-1 px-2 flex items-center gap-2">
              <FaArrowTrendUp />
              <span>20%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-light text-zinc-500">
            Total Savings
          </h2>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-semibold">$1,200</p>
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
export default Stats;
