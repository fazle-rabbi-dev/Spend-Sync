import { useEffect } from "react";
import { useGetTrashedExpenses } from "@/lib/react-query";
import { useAuthStore } from "@/store";
import { ExpenseCard, AllExpense, DeleteAlertModal, Loader, SearchBar } from "@/components";
import { useExpenseStore } from "@/store";

export const Trash = () => {
  const user = useAuthStore(state => state.user);
  const { data: allExpenses, isPending: isLoadingExpenses } = useGetTrashedExpenses(user?.$id);

  const { isOpenDeleteModal, filteredExpenses, setFilteredExpenses } = useExpenseStore(state => ({
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
      <h1 className="heading3">Your Trash</h1>
      <SearchBar allExpenses={allExpenses} source="trash" />
      <AllExpense isLoadingExpenses={isLoadingExpenses} filteredExpenses={filteredExpenses} />
      {isOpenDeleteModal && <DeleteAlertModal permanent={true} />}
    </section>
  );
};
