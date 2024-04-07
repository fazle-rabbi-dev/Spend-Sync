import { useState } from "react"
import { ExpenseCard, Loader, ExpenseDetails } from "@/components";
import { useExpenseStore } from "@/store";

export const AllExpense = ({ isLoadingExpenses, filteredExpenses }) => {
  const [openDetails, setOpenDetails] = useState(false)
  const [clickedItem, setClickedItem] = useState("")
  
  const searchText = useExpenseStore(state => state.searchText);
  
  const toggleDetails = (item) => {
    setOpenDetails(prev => !prev)
    setClickedItem(item ?? "")
  }
  
  return (
    <ul className="">
      {isLoadingExpenses ? (
        <Loader />
      ) : filteredExpenses?.length > 0 ? (
        filteredExpenses.map(expense => <ExpenseCard key={expense?.$id} expense={expense} toggleDetails={toggleDetails} />)
      ) : (
        <span className="text-gray-500">
          {searchText ? "No result found 🔭" : "You haven't logged any expenses today. Let's start tracking your spending! 🚀"}
        </span>
      )}
      
      { openDetails && <ExpenseDetails clickedItem={clickedItem} toggleDetails={toggleDetails} /> }
    </ul>
  );
};
