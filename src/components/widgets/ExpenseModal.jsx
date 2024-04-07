import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { modalFormFields } from "@/constants";
import { expenseSchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateExpense, useUpdateExpense } from "@/lib/react-query";
import { useAuthStore, useExpenseStore } from "@/store";
import { Loader } from "@/components";
import { showToast, formatAppwriteDateForInput } from "@/lib/utils";

export const ExpenseModal = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(expenseSchema)
  });
  const [selectedDate, setSelectedDate] = useState("");

  // From zustand store
  const user = useAuthStore(state => state.user);
  const { isOpenModal, actionType, toggleModal, editableItem } = useExpenseStore();

  // Mutations from react-query
  const { mutateAsync: createExpense, isPending: isCreatingExpense } = useCreateExpense();
  const { mutateAsync: updateExpense, isPending: isUpdatingExpense } = useUpdateExpense();

  const onSubmit = async data => {
    data.owner = user?.$id;
    data.expenseType = data.type;
    data.date = new Date(selectedDate).toISOString();
    delete data.type;

    let res = null;
    if (actionType === "add") {
      res = await createExpense(data);
    } else {
      res = await updateExpense({
        newData: data,
        originalData: editableItem,
        owner: user?.$id
      });
    }

    if (res?.$id) {
      showToast(`Expense ${actionType === "add" ? "created" : "updated"} successfully.`);
      reset();
      toggleModal();
    } else {
      showToast(`Failed to ${actionType === "add" ? "create" : "update"} expense.`, "error");
    }
  };

  useEffect(() => {
    setSelectedDate(watch("date"));
  }, [watch("date")]);

  useEffect(() => {
    if (actionType === "edit" && editableItem) {
      const newDate = formatAppwriteDateForInput(editableItem.date);

      setValue("title", editableItem.title);
      setValue("description", editableItem.description);
      setValue("amount", editableItem.amount);
      setValue("type", editableItem.expenseType);
      setValue("date", newDate);
      setSelectedDate(newDate);
    }
  }, [editableItem]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-full bg-black/50 backdrop-blur flex justify-center items-center px-6 py-10 ${
        isOpenModal ? "block" : "hidden"
      }`}
    >
      <div className="h-full w-full bg-white rounded-md p-4 overflow-auto md:max-w-3xl md:h-auto dark-theme">
        <div className="flex justify-between items-center">
          <h2 className="heading3">{actionType === "edit" ? "Edit" : "Add new"} expense</h2>
          <button onClick={toggleModal} className="bg-gray-50 shadow p-2 rounded text-gray-600" type="button">
            <X />
          </button>
        </div>
        <form className="py-6" onSubmit={handleSubmit(onSubmit)}>
          {modalFormFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={field.name} className="block text-gray-700 font-semibold mb-2 dark:text-gray-200">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  //id={field.name}
                  name={field.name}
                  className="bg-transparent border border-gray-300 rounded-md py-2 px-3 w-full h-24 resize-none focus:outline-none focus:border-blue-400"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  {...register(field.name, { required: true })}
                />
              ) : field.type === "type" ? (
                <select
                  //id={field.name}
                  name={field.name}
                  className="border bg-transparent border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-400"
                  {...register(field.name, { required: true })}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "date" ? (
                <div className="relative">
                  <input
                    type={field.type}
                    //id={field.name}
                    name={field.name}
                    className="relative bg-transparent modal-form-input"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    {...register(field.name, { required: true })}
                  />
                  {!selectedDate && <span className="absolute left-4 top-2 text-gray-400">Select a date</span>}
                </div>
              ) : (
                <input
                  type={field.type}
                  //id={field.name}
                  name={field.name}
                  className="bg-transparent modal-form-input"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  {...register(field.name, { required: true })}
                />
              )}

              {errors[field.name] && <p className="text-red-500 text-xs italic">{errors[field.name].message}</p>}
            </div>
          ))}
          <button
            disabled={isCreatingExpense}
            type="submit"
            className="mt-8 bg-gradient-blue w-full flex justify-center items-center gap-2 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            {isCreatingExpense || (isUpdatingExpense && <Loader color="white" />)}
            <span>{isCreatingExpense ? "Saving" : "Save"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
