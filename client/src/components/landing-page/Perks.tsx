import { MdMoneyOff } from "react-icons/md";
import { IoEye } from "react-icons/io5";

const Perks = () => {
  return (
    <section className="px-3 lg:px-36 py-10 bg-slate-50 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col gap-7 bg-zinc-100 container py-7 lg:py-12 rounded-lg">
        <div className="bg-yellow-400 p-1 rounded-xl w-fit text-3xl">
          <MdMoneyOff />
        </div>
        <h2 className="text-2xl font-bold text-zinc-800">
          Completely free
        </h2>
        <div className="font-semibold text-zinc-500 text-base leading-8">
          We don't charge you anything to use our service.
          We believe that everyone should have access to an
          emergency fund.
        </div>
      </div>
      <div className="flex flex-col gap-7 bg-zinc-100 container py-7 lg:py-12 rounded-lg">
        <div className="bg-yellow-400 p-1 rounded-xl w-fit text-3xl">
          <IoEye />
        </div>
        <h2 className="text-2xl font-bold text-zinc-800">
          Visibility
        </h2>
        <div className="font-semibold text-zinc-500 text-base leading-8">
          Get real time visibility into your emergency fund.
          See how much you saved every month and how much
          you need to save to reach your goal.
        </div>
      </div>
      <div className="flex flex-col gap-7 bg-zinc-100 container py-7 lg:py-12 rounded-lg">
        <div className="bg-yellow-400 p-1 rounded-xl w-fit text-3xl">
          <MdMoneyOff />
        </div>
        <h2 className="text-2xl font-bold text-zinc-800">
          Saving made easy
        </h2>
        <div className="font-semibold text-zinc-500 text-base leading-8">
          Our platform makes it easy to save money every
          month. The only thing you need to do is set a goal
          and we'll take care of the rest.
        </div>
      </div>
    </section>
  );
};
export default Perks;
