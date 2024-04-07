import { useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ExpenseModal, ExpenseCard, DeleteAlertModal, Loader, SearchBar } from "@/components";
import { TodayExpenseCard, AllExpense } from "@/components";
import { useGetTodayExpenses } from "@/lib/react-query";
import { useAuthStore, useExpenseStore } from "@/store";

export const Dashboard = () => {
  const user = useAuthStore(state => state.user);
  const { isOpenModal, toggleModal, isOpenDeleteModal, filteredExpenses, setFilteredExpenses } = useExpenseStore(state => ({
    isOpenModal: state.isOpenModal,
    toggleModal: state.toggleModal,
    isOpenDeleteModal: state.isOpenDeleteModal,
    filteredExpenses: state.filteredExpenses,
    setFilteredExpenses: state.setFilteredExpenses
  }));

  const { data: allExpenses, isLoading: isLoadingExpenses } = useGetTodayExpenses({ userId: user?.$id, forToday: true });

  useEffect(() => {
    handleBodyScroll(isOpenModal);

    if (allExpenses) {
      setFilteredExpenses(allExpenses);
    }
    
    return () => {
      setFilteredExpenses([]);
    };
  }, [isOpenModal, allExpenses]);

  const handleBodyScroll = isOpen => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  };

  return (
    <section className="">
      <TodayExpenseCard allExpenses={allExpenses} />

      <div className="flex items-center justify-between">
        <h1 className="heading3 text-center mb-4">Today Expenses</h1>
      </div>

      <div className="flex items-center justify-between gap-2 mb-4">
        <SearchBar allExpenses={allExpenses} source="dashboard" />
        <button onClick={toggleModal} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-2 rounded">
          Add Expense
        </button>
      </div>

      <AllExpense isLoadingExpenses={isLoadingExpenses} filteredExpenses={filteredExpenses} />
      
      {isOpenModal && <ExpenseModal />}
      {isOpenDeleteModal && <DeleteAlertModal />}
    </section>
  );
};
