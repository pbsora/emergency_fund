import TopBar from "@/components/dashboard/TopBar";
import Transactions from "@/components/transactions/Transactions";

const TransactionsPage = () => {
  return (
    <main className="flex flex-col w-full h-screen container">
      <div className="self-end">
        <TopBar />
      </div>
      <Transactions />
    </main>
  );
};
export default TransactionsPage;
