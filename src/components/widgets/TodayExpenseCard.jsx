import { useState, useEffect } from "react";
import { calculateTotalAmount } from "@/lib/utils";
import { Receipt } from "lucide-react";

export const TodayExpenseCard = ({ allExpenses }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full mb-10 px-4 py-8 bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90% text-white rounded-md">
      <p className="text-white flex items-center gap-1 mb-4">
        {currentDateTime.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })}
      </p>
      <h2 className="heading3 flex flex-wrap gap-1 items-center">
        <Receipt />
        {allExpenses && calculateTotalAmount(allExpenses)}
      </h2>
      <p>Your total expenses today.</p>
    </div>
  );
};
