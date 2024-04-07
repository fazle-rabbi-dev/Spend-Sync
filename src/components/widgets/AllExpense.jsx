import { useLocation } from "react-router-dom";
import { useState } from "react";
import { ExpenseCard, Loader, ExpenseDetails } from "@/components";
import { useExpenseStore } from "@/store";

export const AllExpense = ({ isLoadingExpenses, filteredExpenses }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [clickedItem, setClickedItem] = useState("");

  const { pathname } = useLocation();

  const searchText = useExpenseStore(state => state.searchText);

  const toggleDetails = item => {
    setOpenDetails(prev => !prev);
    setClickedItem(item ?? "");
  };

  return (
    <ul className="">
      {isLoadingExpenses ? (
        <Loader />
      ) : filteredExpenses?.length > 0 ? (
        filteredExpenses.map(expense => <ExpenseCard key={expense?.$id} expense={expense} toggleDetails={toggleDetails} />)
      ) : (
        <p className="text-gray-500">
          {searchText
            ? "No result found 🔭"
            : pathname === "/trash"
            ? "Your trash is empty."
            : (
                <span>You haven't logged any expenses {pathname === "/dashboard" ? <span className="underline font-bold">today</span>: ""}. Let's start tracking your spending! 🚀</span>
              )
          }
        </p>
      )}

      {openDetails && <ExpenseDetails clickedItem={clickedItem} toggleDetails={toggleDetails} />}
    </ul>
  );
};
