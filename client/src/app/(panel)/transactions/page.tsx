import TopBar from "@/components/dashboard/TopBar";
import Transactions from "@/components/transactions/Transactions";

const TransactionsPage = () => {
  return (
    <main className="flex flex-col w-full h-screen container gap-3 lg:gap-0 mt-5 lg:mt-0">
      <div className="self-end">
        <TopBar />
      </div>
      <Transactions />
    </main>
  );
};
export default TransactionsPage;
