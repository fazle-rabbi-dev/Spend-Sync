import { useState } from "react";
import { ListFilter, FileText } from "lucide-react";
import { useExpenseStore } from "@/store";
import { filterExpensesForLast7Days, filterExpensesForLast14Days, filterExpensesForLast1Month } from "@/lib/utils";
import { saveAs } from "file-saver";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ExpensePdfDocument } from "@/components";
import { useAuthStore } from "@/store";

const displayMessage = number => {
  return `${number} days expenses`;
};

export const FilterExpense = ({ allExpenses }) => {
  const [selectedItem, setSelectedItem] = useState("");

  const { filteredExpenses, setFilteredExpenses } = useExpenseStore(state => ({
    filteredExpenses: state.filteredExpenses,
    setFilteredExpenses: state.setFilteredExpenses
  }));
  const user = useAuthStore(state => state.user);

  const handleChange = e => {
    const value = e.target.value;
    
    let data = ""
    if (value === "7") {
      setSelectedItem(displayMessage(7));
      data = filterExpensesForLast7Days(filteredExpenses);
    } else if (value === "14") {
      setSelectedItem(displayMessage(14));
      data = filterExpensesForLast14Days(filteredExpenses);
    } else if (value === "30") {
      setSelectedItem(displayMessage(30));
      data = filterExpensesForLast1Month(filteredExpenses);
    } else {
      setSelectedItem(displayMessage("Custom"));
    }

    if (value === "reset") {
      setFilteredExpenses(allExpenses);
      setSelectedItem("");
      return;
    }

    setFilteredExpenses(data);
  };

  return (
    <div className="my-4 ">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <PDFDownloadLink document={<ExpensePdfDocument expenses={filteredExpenses} username={user?.name} dateRange={selectedItem} />} fileName="expenses.pdf">
          {({ loading }) => (
            <button className="flex items-center gap-1 px-2 py-1 text-blue-600 border-[1px] rounded border-blue-600" type="button" disabled={loading || filteredExpenses?.length === 0}>
              <span>
                <FileText size={20} />
              </span>
              <span>Download Pdf</span>
            </button>
          )}
        </PDFDownloadLink>

        <select
          onChange={handleChange}
          className="px-2 py-1 rounded border-[1px] border-black/80 focus:outline-0 dark:bg-transparent dark:border-white"
        >
          <option value="" disabled selected={!selectedItem} hidden>
            Filter Expenses
          </option>
          <option value="7">Last 7 days</option>
          <option value="14">Last 14 days</option>
          <option value="30">Last 1 month</option>
          <option value="reset">Reset</option>
        </select>
      </div>
      {selectedItem && (
        <div className="my-2">
          <p>🚀 Displaying last {selectedItem}</p>
        </div>
      )}
    </div>
  );
};
