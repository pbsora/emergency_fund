import TopBar from "@/components/dashboard/TopBar";
import NewTransactionDialog from "@/components/transactions/NewTransactionDialog";
import { Button } from "@/components/ui/button";
import API from "@/utils/api";
import { IoMdArrowDropright } from "react-icons/io";

const Transactions = async () => {
  const transactions = await API.get(
    "/transactions?limit=10"
  ).then((res) => res.json());

  return (
    <main className="flex flex-col w-full h-screen container">
      <div className="self-end">
        <TopBar />
      </div>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-zinc-800 dark:text-zinc-200">
          Transactions
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Button
              variant={"outline"}
              className="text-3xl px-2 rotate-180 dark:bg-zinc-200 text-zinc-900 hover:text-zinc-900 dark:hover:bg-zinc-300 duration-200"
            >
              <IoMdArrowDropright />
            </Button>
            <Button
              variant={"outline"}
              className="text-3xl px-2 dark:bg-zinc-200 text-zinc-900 hover:text-zinc-900 dark:hover:bg-zinc-300 duration-200"
            >
              <IoMdArrowDropright />
            </Button>
          </div>
          <NewTransactionDialog />
        </div>
      </div>
      <hr className="border-b border-zinc-200 mt-4" />
      <div className="flex-1 w-full mb-2"></div>
    </main>
  );
};
export default Transactions;
