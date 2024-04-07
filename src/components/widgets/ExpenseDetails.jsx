import { X } from "lucide-react";

export const ExpenseDetails = ({ clickedItem, toggleDetails }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0  w-full z-50 backdrop-blur flex justify-center items-center py-10 padding-container">
      <div className="h-full w-full bg-white rounded-md shadow-md p-4 overflow-auto md:max-w-3xl md:h-auto dark-theme">
        <div className="flex justify-between items-center">
          <h2 className="heading3">Expense Details</h2>
          <button onClick={toggleDetails} className="p-2 rounded bg-gray-200 shadow dark:bg-white dark:text-black" type="button">
            <X />
          </button>
        </div>

        <div className="mt-8">
          <h3 className="font-bold text-lg">&gt; {clickedItem?.title}</h3>
          <div className="my-2">
            <p className="mb-2 text-blue-600">&gt; Description:</p>
            <p className="text-sm break-all break-words" style={{ whiteSpace: "pre-wrap" }}>
              {clickedItem?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
