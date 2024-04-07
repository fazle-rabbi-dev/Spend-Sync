import { useEffect } from "react";
import { Globe, ShoppingCart, Receipt, RotateCcw, SquarePen, Trash } from "lucide-react";
import { useExpenseStore, useAuthStore } from "@/store";
import { formatDate, showToast } from "@/lib/utils";
import { useRestoreExpenseFromTrash } from "@/lib/react-query";

export const ExpenseCard = ({ expense, toggleDetails }) => {
  const { toggleModal, isOpenDeleteModal, toggleDeleteModal } = useExpenseStore(state => ({
    toggleModal: state.toggleModal,
    isOpenDeleteModal: state.isOpenDeleteModal,
    toggleDeleteModal: state.toggleDeleteModal
  }));
  const user = useAuthStore(state => state.user);

  const { mutateAsync: restoreExpense, isPending: isRestoringExpense } = useRestoreExpenseFromTrash();

  const handleBodyScroll = isOpen => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Hide body scroll
    } else {
      document.body.style.overflow = "auto"; // Restore body scroll
    }
  };

  useEffect(() => {
    handleBodyScroll(isOpenDeleteModal);
  }, [isOpenDeleteModal]);

  const handleRestoreItem = async () => {
    const res = await restoreExpense({ trashedItem: expense, owner: user?.$id });
    if (!res?.ok) {
      return showToast("Failed to restore expense.", "error");
    }

    showToast("Expense restored successfully.");
  };

  return (
    <li className="my-4 bg-white rounded-lg shadow-lg p-6 dark:bg-dark-secondary">
      <div className="flex justify-between items-center ">
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-blue-100">
          {expense.expenseType}
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          {formatDate(expense.date)}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-bold flex items-center gap-2">{expense.title}</h2>
      <p className="text-gray-600 mt-2 mb-4 dark:text-gray-400 line-clamp-2">{expense.description}</p>

      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold flex flex-wrap items-center gap-1">
          <Receipt />
          {expense.amount}
        </p>
        <div className={isRestoringExpense && "pointer-events-none"}>
          {expense?.isTrashed ? (
            <button onClick={handleRestoreItem} className="bg-gradient-blue text-white p-1 rounded mr-2">
              <span>
                <RotateCcw size={20} />
              </span>
            </button>
          ) : (
            <button onClick={() => toggleModal("edit", expense)} className="bg-gradient-blue text-white p-1 rounded mr-2">
              <span>
                <SquarePen size={20} />
              </span>
            </button>
          )}
          <button onClick={() => toggleDeleteModal(expense)} className="bg-red-500 text-white p-1 rounded">
            <span>
              <Trash size={20} />
            </span>
          </button>
        </div>
      </div>

      <button className="text-blue-500 font-light border-[.5px] border-blue-500 p-2 w-full" onClick={() => toggleDetails(expense)} type="button">
        View Details
      </button>
    </li>
  );
};
