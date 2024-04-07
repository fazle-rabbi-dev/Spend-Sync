import { useEffect } from "react";
import { useGetAllExpenses } from "@/lib/react-query";
import { useAuthStore, useExpenseStore } from "@/store";
import { ExpenseCard, AllExpense, ExpenseModal, DeleteAlertModal, Loader, SearchBar, FilterExpense } from "@/components";

export const Expenses = () => {
  const user = useAuthStore(state => state.user);
  const { data: allExpenses, isPending: isLoadingExpenses } = useGetAllExpenses({ userId: user?.$id });

  const { isOpenModal, isOpenDeleteModal, filteredExpenses, setFilteredExpenses } = useExpenseStore(state => ({
    isOpenModal: state.isOpenModal,
    isOpenDeleteModal: state.isOpenDeleteModal,
    filteredExpenses: state.filteredExpenses,
    setFilteredExpenses: state.setFilteredExpenses
  }));

  useEffect(() => {
    if (allExpenses) {
      setFilteredExpenses(allExpenses);
    }

    return () => {
      setFilteredExpenses([]);
    };
  }, [allExpenses]);

  return (
    <section className="">
      <h1 className="heading3">All Expenses</h1>

      <SearchBar allExpenses={allExpenses} />
      <FilterExpense allExpenses={allExpenses} />
      <AllExpense isLoadingExpenses={isLoadingExpenses} filteredExpenses={filteredExpenses} />
      
      {isOpenModal && <ExpenseModal />}
      {isOpenDeleteModal && <DeleteAlertModal />}
    </section>
  );
};
