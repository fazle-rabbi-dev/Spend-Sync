import { toast } from "react-hot-toast";

export const showToast = (msg = "Here is your toast", type = "success", time = 2000, primaryColor = "#096ffc") => {
  toast[type](msg, {
    duration: time,
    position: "top-center"
  });
};

// Function to convert the first character of a string to uppercase
export function capitalizeFirstLetter(string) {
  // Check if the string is not empty
  if (string.length > 0) {
    // Capitalize the first letter and concatenate it with the rest of the string
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    // Return empty string if input is empty
    return "";
  }
}

/*export const formatDate = date => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};*/

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "long", day: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = key => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeLocalStorageItem = key => {
  localStorage.removeItem(key);
};

export const validateEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = password => {
  return password.length >= 8;
};

export function formatAppwriteDateForInput(appwriteDateString) {
  const appwriteDate = new Date(appwriteDateString);
  const htmlInputDateFormat = appwriteDate.toISOString().split("T")[0];
  return htmlInputDateFormat;
}

export function calculateTotalAmount(expenses) {
  // Initialize total amount variable
  let totalAmount = 0;

  // Loop through each expense object and sum up the amounts
  expenses?.forEach(expense => {
    // Add the amount of each expense to the total amount
    totalAmount += expense.amount;
  });

  // Return the total amount
  return totalAmount;
}

// =====================================================================================================================
// Filter Expenses By Date
// =====================================================================================================================

// Utility function to check if a date is within the last N days
const isWithinLastNDays = (dateString, n) => {
  const currentDate = new Date();
  const expenseDate = new Date(dateString);
  const nDaysAgo = new Date(currentDate.getTime() - n * 24 * 60 * 60 * 1000); // Calculate date n days ago

  return expenseDate >= nDaysAgo && expenseDate <= currentDate;
};

// Function to filter expenses for the last N days
const filterExpensesForLastNDays = (allExpenses, n) => {
  return allExpenses.filter(expense => isWithinLastNDays(expense.date, n));
};

// Function to filter expenses for the last 7 days
export const filterExpensesForLast7Days = allExpenses => {
  console.log(allExpenses);
  return allExpenses.filter(expense => isWithinLastNDays(expense.date, 7));
};

// Function to filter expenses for the last 14 days
export const filterExpensesForLast14Days = allExpenses => {
  return filterExpensesForLastNDays(allExpenses, 14);
};

// Function to filter expenses for the last 1 month
export const filterExpensesForLast1Month = allExpenses => {
  // Get the date 1 month ago
  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

  // Filter expenses that occurred after one month ago
  return allExpenses.filter(expense => new Date(expense.date) >= oneMonthAgo);
};

// Function to filter expenses for a custom date range
export const filterExpensesForCustomDateRange = (allExpenses, startDate, endDate) => {
  // Parse start and end date strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Filter expenses that fall within the custom date range
  return allExpenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= start && expenseDate <= end;
  });
};
