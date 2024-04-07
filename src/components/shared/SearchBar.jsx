import { useState } from "react";
import { Search } from "lucide-react";
import { useExpenseStore } from "@/store";

export const SearchBar = ({ allExpenses, source }) => {
  const { setFilteredExpenses, searchText, setSearchText } = useExpenseStore(state => ({
    setFilteredExpenses: state.setFilteredExpenses,
    searchText: state.searchText,
    setSearchText: state.setSearchText
  }));

  const searchExpense = e => {
    const value = e.target.value;
    setSearchText(value);

    if (!value) {
      return setFilteredExpenses(allExpenses);
    }

    const filteredItem = allExpenses.filter(obj => obj.title.toLowerCase().startsWith(value.toLowerCase()));
    setFilteredExpenses(filteredItem);
  };

  return (
    <div className={`${source === "dashboard" ? "w-7/12" : "w-full"} flex items-center border-[1px] border-gray-500/40 my-2 py-2 px-2 rounded-md`}>
      <button className="text-gray-500" type="button">
        <Search size={18} />
      </button>
      <input
        onChange={searchExpense}
        placeholder="Search"
        className="w-full pl-2 border-none bg-transparent focus:outline-0"
        type="text"
        value={searchText}
      />
    </div>
  );
};
